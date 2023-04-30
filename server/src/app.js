const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const connectionString = process.env.MONGO_URL;
mongoose.connect(connectionString);

const userRouter = require("./users/user.router");
const productRouter = require("./products/product.router");
const friendRouter = require("./friends/friend.router");
const chatRouter = require("./chats/chat.router");
const publicRoomRouter = require("./publicRooms/publicRoom.router");
const privateRoomRouter = require("./privateRooms/privateRoom.router");
const { firebaseAuth } = require("./middlewares/firebaseAuth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/friends", friendRouter);
app.use("/api/chats", chatRouter);
app.use("/api/publicRooms", publicRoomRouter);
app.use("/api/privateRooms", privateRoomRouter);

app.get("/api/health", (_, res) => {
  res.json("OK");
});

app.get("/api/secure", [firebaseAuth], (req, res) => {
  res.json(`Authentication succeed. Hi ${req.user.name}`);
});

module.exports = app;
