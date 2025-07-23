const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	status: {
		type: String,
		enum: ['reveal', null],
		default: null
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	median: {
		type: String,
		default: null
	},
	average: {
		type: String,
		default: null
	},
}, { versionKey: false });

// Cascading delete middleware
roomSchema.pre(['findOneAndDelete', 'findByIdAndDelete'], async function() {
    const roomId = this.getQuery()._id;
    
    // Find all users that belong to this room and delete
    const User = mongoose.model('User');
    await User.deleteMany({ roomId });
    // Find all votes that belong to this room and delete
    const Vote = mongoose.model('Vote');
    await Vote.deleteMany({ roomId });
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
