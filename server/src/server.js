const app = require("./app");
const { Server } = require("socket.io");
const { ConfigureSocket } = require("./sockets");
const http = require("http");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

ConfigureSocket(io);
