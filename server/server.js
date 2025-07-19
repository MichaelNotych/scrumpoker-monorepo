const express = require("express");
const cors = require("cors");
const cron = require('node-cron');
const { status } = require("http-status");

const ApiError = require("./utils/ApiError");
const { errorHandler, errorConverter } = require("./middlewares/error");
const roomRouter = require("./routes/room.route");
const userRouter = require("./routes/user.route");
const config = require("./config/config");
const { roomService } = require("./services");
// job for deleting old rooms every 3 days
cron.schedule('0 0 */3 * *', () => {
	roomService.clearOldRooms();
});

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: config.clientUrl,
		methods: ["GET", "POST"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);
app.use("/api/v1", roomRouter);
app.use("/api/v1", userRouter);
app.use((req, res, next) => {
	next(new ApiError(status.NOT_FOUND, "Not found"));
});
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
