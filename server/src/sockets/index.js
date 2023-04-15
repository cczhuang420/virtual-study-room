const { firebaseSocketAuth } = require("../middlewares/firebaseAuth");
const ytdl = require("ytdl-core");

const ConfigureSocket = (io) => {
  io.use(firebaseSocketAuth);

  io.on("connection", (socket) => {
    console.log(`${socket.user.name} with id ${socket.user.uid} connected`);

    const stream = ytdl("https://www.youtube.com/watch?v=RT7CPnQtwf0", {
      filter: "audioonly",
    });

    stream.on("data", (chunk) => {
      io.emit("music-chunk", chunk);
    });

    stream.on("end", () => {
      io.emit("music-end");
    });

    socket.on("disconnect", () => {
      console.log(
        `${socket.user.name} with id ${socket.user.uid} disconnected`
      );
    });
  });
};

module.exports = { ConfigureSocket };
