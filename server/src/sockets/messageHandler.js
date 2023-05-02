const chatControllerClass = require("../chats/chat.controller");
const chatController = new chatControllerClass();

const messageHandler = (io, socket) => {
  socket.on("message", (message) => {
    io.emit("message", message);
  });

  socket.on("send-message", async (data) => {
    socket.emit("message", data);

    // find the receiver socket and send message
    io.sockets.sockets.forEach((eachSocket) => {
      if (eachSocket.user.email === data.receiverEmail) {
        console.log(
          data.senderName +
            " sent message to user with email " +
            data.receiverEmail
        );

        // send event to update message display
        eachSocket.emit("message", data);

        // send notification to receiver
        eachSocket.emit("message-notification", data);
      }
    });

    // save message to database
    await chatController.createChat(
      data.senderId,
      data.receiverId,
      data.timestamp,
      data.message
    );
  });
};

module.exports = messageHandler;
