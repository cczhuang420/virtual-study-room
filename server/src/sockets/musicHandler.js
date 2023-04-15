const musicHandler = (io, socket) => {
  const stream = ytdl("https://www.youtube.com/watch?v=RT7CPnQtwf0", {
    filter: "audioonly",
  });

  stream.on("data", (chunk) => {
    io.emit("music-chunk", chunk);
  });

  stream.on("end", () => {
    io.emit("music-end");
  });
};

module.exports = musicHandler;
