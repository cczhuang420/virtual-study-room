const messageHandler = (io, socket) => {
  socket.on("message", (message) => {
    io.emit("message", message);
  });
};

module.exports = messageHandler;
