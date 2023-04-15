const { firebaseSocketAuth } = require("../middlewares/firebaseAuth");
const ytdl = require("ytdl-core");

const registerMessageHandler = require("./messageHandler");
const registerMusicHandler = require("./musicHandler");

const ConfigureSocket = (io) => {
  io.use(firebaseSocketAuth);

  io.on("connection", (socket) => {
    console.log(`${socket.user.name} with id ${socket.user.uid} connected`);

    registerMessageHandler(io, socket);
    registerMusicHandler(io, socket);

    socket.on("disconnect", () => {
      console.log(
        `${socket.user.name} with id ${socket.user.uid} disconnected`
      );
    });
  });
};

module.exports = { ConfigureSocket };
