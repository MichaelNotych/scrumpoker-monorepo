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

const clearOldRooms = async () => {
	const rooms = await Room.find({});
	const deletedRooms = [];
	logger.info(`DELETE OLD ROOMS`)
	const dayAgoTimeStamp = Date.now() - 24 * 60 * 60 * 1000
	for (let i = 0; i < rooms.length; i++) {
		const room = rooms[i];
		console.log(room.createdAt,  dayAgoTimeStamp, room.createdAt < dayAgoTimeStamp)
		if (room.createdAt < dayAgoTimeStamp) {
			deletedRooms.push(room._id);
			await Room.deleteOne({_id: room._id});
		}
	}

	logger.info(`Deleted rooms: ${deletedRooms.length}`)
}

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
};

/**
 * Remove user from ACTIVE_ROOMS and set timeout for deleting from DB
 * @param {string} userId 
 * @param {string} roomId 
 */
const proccessUserLeave = async (userId, roomId) => {
	if (!ACTIVE_ROOMS[roomId]) return;

	await removeUserInActiveRoom(userId, roomId);
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
	proccessUserLeave,
	clearOldRooms
};
