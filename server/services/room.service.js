const voteService = require("./vote.service");
const userService = require("./user.service");
const { Room } = require("../models");
const { status } = require("http-status");
const ApiError = require("../utils/ApiError");
const logger = require("../config/logger");

const ACTIVE_ROOMS = {};

const createRoom = async (body) => {
	const room = await Room.create(body);
	return room;
};

const getRoomById = async (id) => {
	const room = await Room.findOne({_id: id});
	if (!room) {
		throw new ApiError(status.NOT_FOUND, "Room not found");
	}
	return room;
};

const deleteRoomById = async (id) => {
	await Room.findByIdAndDelete(id);
};

/**
 * Add user to ACTIVE_ROOMS
 * @param {string} roomId 
 */
const enterRoom = async (roomId, userId, res) => {
	
	const user = await userService.getUserById(userId);
	user.roomId = roomId;
	await user.save();

	if (!ACTIVE_ROOMS[roomId]) {
		ACTIVE_ROOMS[roomId] = {};
	}

	ACTIVE_ROOMS[roomId][userId] = {
		res,
		userName: user.name,
		time: Date.now(),
	};

	logger.info(`ACTIVE_ROOMS_ENTER (rooms: ${Object.keys(ACTIVE_ROOMS).length}): ${JSON.stringify(Object.keys(ACTIVE_ROOMS))}, users in current room: ${Object.keys(ACTIVE_ROOMS[roomId]).length}`);

	sendEvent("usersUpdate", roomId, {
		users: getUsersInRoom(roomId),
	});

	const votes = await voteService.getAllRoomVotes(roomId);
	sendEvent("votesUpdate", roomId, {
		votes,
	});

	sendPingEvent(res);
};

/**
 * Helper for sending events to all room members
 * @param {string} roomId 
 */
const sendEvent = async (eventName, roomId, data) => {
	const roomObj = ACTIVE_ROOMS[roomId];
	if (!roomObj) return;
	Object.keys(roomObj).forEach((userId) => {
		roomObj[userId].res.write(
			`event: ${eventName}\ndata: ${JSON.stringify(data)}\n\n`
		);
	});
};

/**
 * Send a ping event to keep the SSE connection alive
 * @param {Response} res 
 */
const sendPingEvent = async (res) => {
	setInterval(() => {
		res.write(
			`event: ping\ndata: ${JSON.stringify({ timestamp: Date.now() })}\n\n`
		);
	}, 10000);
};


/**
 * Helper for getting users in a room
 * @param {string} roomId 
 */
const getUsersInRoom = (roomId) => {
	const users = {};
	const roomObj = ACTIVE_ROOMS[roomId];
	if (!roomObj) return users;
	Object.keys(roomObj).forEach((userId) => {
		users[userId] = { id: userId, name: roomObj[userId].userName };
	});
	return users;
};

/**
 * Set user vote
 * @param {string} vote 
 * @param {string} userId 
 * @param {string} roomId 
 */
const submitVote = async (value, roomId, userId) => {
	// udpate user vote
	await voteService.updateVote(value, roomId, userId);
	
	ACTIVE_ROOMS[roomId][userId].time = Date.now();

	// update all users
	const votes = await voteService.getAllRoomVotes(roomId);
	sendEvent("votesUpdate", roomId, {
		votes,
	});
};

/**
 * Calculate room results
 * @param {string} roomId 
 */
const revealRoomResults = async (roomId) => {
	const room = await getRoomById(roomId);
	const votes = await voteService.getAllRoomVotes(roomId);
	const hasQuestionMark = votes.some(vote => vote.value === "?");
	const median = hasQuestionMark ? '?' : voteService.getVotesMedian(votes).toString();
	const average = hasQuestionMark ? '?' : voteService.getVotesAverage(votes).toString();

	room.median = median;
	room.average = average;
	room.status = "reveal";
	await room.save();

	sendEvent("resultsReveal", roomId, {
		median,
		average,
		status: room.status,
	});
};

/**
 * Reset room results
 * @param {string} roomId 
 */
const resetRoomResults = async (roomId) => {
	const room = await getRoomById(roomId);
	room.median = null;
	room.average = null;
	room.status = null;
	await room.save();

	await voteService.deleteAllRoomVotes(roomId);

	sendEvent("resultsReset", roomId, {});
	sendEvent("votesUpdate", roomId, {
		votes: [],
	});
};

/**
 * Remove user from ACTIVE_ROOMS & DB
 * @param {string} userId 
 * @param {string} roomId 
 */
const leaveRoom = async (roomId, userId) => {
	if (!ACTIVE_ROOMS[roomId]) return;

	await removeUserInActiveRoom(userId, roomId);
	await removeUserDataInDB(userId, roomId);
};

/**
 * Remove user from ACTIVE_ROOMS and set timeout for deleting from DB
 * @param {string} userId 
 * @param {string} roomId 
 */
const proccessUserLeave = async (userId, roomId) => {
	if (!ACTIVE_ROOMS[roomId]) return;

	await removeUserInActiveRoom(userId, roomId);

	setTimeout(() => {
		if (ACTIVE_ROOMS[roomId] && !ACTIVE_ROOMS[roomId][userId]) {
			removeUserDataInDB(userId, roomId);
		}
	}, 10000);
};

/**
 * Remove user from ACTIVE_ROOMS and send events to other members
 * @param {string} userId 
 * @param {string} roomId 
 */
const removeUserInActiveRoom = async (userId, roomId) => {
	delete ACTIVE_ROOMS[roomId][userId];

	sendEvent("usersUpdate", roomId, {
		users: getUsersInRoom(roomId),
	});

	const votes = await voteService.getAllRoomVotes(roomId);
	sendEvent("votesUpdate", roomId, {
		votes: votes.filter(vote => vote.userId !== userId),
	});

	logger.info(`RM_USER_FROM_ROOM (userid: ${userId}) (users left in room: ${Object.keys(ACTIVE_ROOMS[roomId]).length})`);
}

/**
 * Remove user and user vote from DB. if there is 
 * no other users in the room, also delete a room
 * @param {string} userId 
 * @param {string} roomId 
 */
const removeUserDataInDB = async (userId, roomId) => {
	const room = await getRoomById(roomId);
	const user = await userService.getUserById(userId);
	const userIsRoomOwner = room.owner.equals(user._id);

	const roomsCount = Object.keys(ACTIVE_ROOMS).length;
	// if there is no users in room or current user that left room is room owner
	// delete room, room users and votes
	if ((ACTIVE_ROOMS[roomId] && !Object.keys(ACTIVE_ROOMS[roomId]).length) || userIsRoomOwner) {
		sendEvent("roomDeleted", roomId, {});
		delete ACTIVE_ROOMS[roomId];
		await deleteRoomById(roomId);
		await userService.deleteUsersInRoom(roomId);
		await voteService.deleteAllRoomVotes(roomId);
	} else {
		// only delete user and its vote
		await userService.deleteById(userId);
		await voteService.deleteUserVote(userId);
	}

	logger.info(`RM_USER_FROM_DB (userid: ${userId}) (rooms left: ${roomsCount} -> ${Object.keys(ACTIVE_ROOMS).length})`);
};

module.exports = {
	createRoom,
	getRoomById,
	enterRoom,
	submitVote,
	revealRoomResults,
	resetRoomResults,
	leaveRoom,
	removeUserInActiveRoom,
	getUsersInRoom,
	sendEvent,
	proccessUserLeave
};
