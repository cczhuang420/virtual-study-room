module.exports = (io, socket) => {
  const createMusic = (payload) => {
    // ...
  };

  const readMusic = (orderId, callback) => {
    // ...
  };

  socket.on("music:create", createMusic);
  socket.on("music:read", readMusic);
};
