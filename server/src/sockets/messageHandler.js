const messageHandler = (io, socket) => {
  socket.on("message", (message) => {
    io.emit("message", message);
  });

  socket.on("send-message", (data) => {
    socket.emit("message", data);

    // find the receiver socket and send message
    io.sockets.sockets.forEach((eachSocket) => {
      if (eachSocket.user.uid === data.receiverId) {
        console.log(data.senderId + " sent message to " + data.receiverId);

        // send event to update message display
        eachSocket.emit("message", data);

        // send notification to receiver
        eachSocket.emit("message-notification", data);
      }
    });

    // save message to database
  });
};

module.exports = messageHandler;
