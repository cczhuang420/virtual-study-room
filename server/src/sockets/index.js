const { firebaseSocketAuth } = require("../middlewares/firebaseAuth");

const registerMessageHandler = require("./messageHandler");
const registerMusicHandler = require("./musicHandler");
const { ConfigureMusicService } = require("../services/music");

const ConfigureSocket = (io) => {
  io.use(firebaseSocketAuth);

  ConfigureMusicService((rooms) => {
    console.log("Music service configured");
    registerMusicHandler(io, rooms);
  });

  io.on("connection", (socket) => {
    console.log(`${socket.user.email} with id ${socket.user.uid} connected`);

    registerMessageHandler(io, socket);

    socket.on("disconnect", () => {
      console.log(
        `${socket.user.email} with id ${socket.user.uid} disconnected`
      );

      socket.leaveAll();
    });
  });
};

module.exports = { ConfigureSocket };
