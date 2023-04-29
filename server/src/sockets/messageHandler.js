const messageHandler = (io, socket) => {
  socket.on("send-message-in-rooms", (data) => {
    io.to(data.roomId).emit("message-in-rooms", data);
  });
};

module.exports = messageHandler;
