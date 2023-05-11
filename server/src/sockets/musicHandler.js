const privateRoomControllerClass = require("../privateRooms/privateRoom.controller");
const privateRoomController = new privateRoomControllerClass();
const userControllerClass = require("../users/user.controller");
const userController = new userControllerClass();
const { RetrieveSongsBasicInfo } = require("../services/music");

const roomStates = {};
const songIntervals = {};

const privateRoomActiveUsers = {};

module.exports = (io, rooms) => {
  // Initialize room state for each room in roomStates dictionary
  rooms.forEach((room) => {
    roomStates[room?.id] = {
      songIndex: 0,
      songTime: 0,
    };
  });

  const roomMemberEmails = {};
  rooms?.forEach(({ id }) => {
    roomMemberEmails[id] = [];
  });

  // for each room, keep an interval to keep track of the song time
  rooms?.forEach((room) => {
    songIntervals[room?.id] = null;
  });

  // Define a function to start playing the song for a room
  const playSong = (room) => {
    const roomIndex = rooms?.findIndex((r) => r?.id === room?.id);
    const state = roomStates[room?.id];
    const song = rooms[roomIndex].songs[state?.songIndex];

    if (!song) {
      return;
    }

    io.to(room?.id).emit("new-song", {
      id: song?.id,
      time: state?.songTime,
    });

    // Start a new interval for the room
    songIntervals[room?.id] = setInterval(() => {
      state.songTime++;

      if (state?.songTime >= song?.duration) {
        state.songIndex++;
        if (state?.songIndex >= rooms[roomIndex]?.songs?.length) {
          state.songIndex = 0;
        }

        state.songTime = 0;

        clearInterval(songIntervals[room?.id]);

        playSong(room);
      }
    }, 1000);
  };

  // Start playing songs for each room
  rooms.forEach((room, index) => {
    playSong(room);
  });

  // Whenever a new user joins, send the current song url, title and played upto time to the client
  io.on("connection", (socket) => {
    socket.on("join-room", async (roomId) => {
      console.log(`${socket?.user?.name} joined room ${roomId}`);
      // TODO send list of members
      if (!roomMemberEmails[roomId]) {
        roomMemberEmails[roomId] = [socket?.user?.email];
      } else if (!roomMemberEmails[roomId].includes(socket?.user?.email)) {
        roomMemberEmails[roomId].push(socket?.user?.email);
      }
      console.log(roomMemberEmails[roomId]);
      socket.join(roomId);
      io.to(roomId).emit("room-member-emails", roomMemberEmails[roomId]);

      // check if user in entering a private room
      const roomIndex = rooms.findIndex((room) => room?.id === roomId);
      if (roomIndex === -1) {
        // check to see if the user is the first one to enter the room
        if (!privateRoomActiveUsers[roomId]) {
          privateRoomActiveUsers[roomId] = [];

          // get the room owner's playlist from database
          const room = await privateRoomController.findById(roomId);
          const owner = await userController.findById(room?.ownerId);
          // add the owner's playlist along with room id to rooms and start playing
          const songsWithBasicInfo = await RetrieveSongsBasicInfo(
            owner?._id,
            owner?.playList
          );

          rooms.push({
            id: roomId,
            songs: songsWithBasicInfo,
          });
          roomStates[roomId] = {
            songIndex: 0,
            songTime: 0,
          };
          songIntervals[roomId] = null;

          playSong(room);
        }
        // add the user to the list of active users
        privateRoomActiveUsers[roomId].push(socket?.user?.email);
      }
    });

    socket.on("leave-room", (roomId) => {
      console.log(`${socket?.user?.name} left room ${roomId}`);
      // TODO remove user and send list of members
      const index = roomMemberEmails[roomId].indexOf(socket?.user?.email);
      index !== -1 && roomMemberEmails[roomId].splice(index, 1);
      io.to(roomId).emit("room-member-emails", roomMemberEmails[roomId]);
      socket.leave(roomId);

      // check if user is leaving a private room and is the last one to leave
      if (privateRoomActiveUsers[roomId]) {
        // remove the user from the list of active users
        const index = privateRoomActiveUsers[roomId].indexOf(
          socket?.user?.email
        );
        index !== -1 && privateRoomActiveUsers[roomId].splice(index, 1);

        // remove all relevant records from rooms, roomStates and songIntervals
        if (privateRoomActiveUsers[roomId].length === 0) {
          const roomIndex = rooms.findIndex((room) => room.id === roomId);
          if (roomIndex !== -1) {
            rooms.splice(roomIndex, 1);
            delete roomStates[roomId];
            clearInterval(songIntervals[roomId]);
            delete songIntervals[roomId];
          }
          delete privateRoomActiveUsers[roomId];
        }
      }
    });

    socket.on("get-song-for-room", (roomId) => {
      const roomIndex = rooms.findIndex((room) => room.id === roomId);
      if (roomIndex !== -1) {
        const state = roomStates[roomId];
        const song = rooms[roomIndex].songs[state?.songIndex];
        if (!song) return;
        socket.emit("song", {
          id: song.id,
          time: state?.songTime,
        });
      }
    });
  });
};
