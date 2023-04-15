const { firebaseSocketAuth } = require("../middlewares/firebaseAuth");
const ytdl = require("ytdl-core");

const registerMessageHandler = require("./messageHandler");
const registerMusicHandler = require("./musicHandler");
let currentPosition = 0;

const ConfigureSocket = (io) => {
  io.use(firebaseSocketAuth);

  io.on("connection", (socket) => {
    console.log(`${socket.user.name} with id ${socket.user.uid} connected`);

    socket.on("music:playBackPosition", (data) => {
      if (data.position > currentPosition) {
        currentPosition = data.position;
      }
    });

    socket.on("music:play", () => {
      const stream = ytdl("https://www.youtube.com/watch?v=RT7CPnQtwf0", {
        filter: "audioonly",
      });

      stream.on("data", (chunk) => {
        io.emit("music-chunk", chunk);
      });

      stream.on("end", () => {
        io.emit("music-end", { positionToStart: currentPosition });
      });
    });

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
