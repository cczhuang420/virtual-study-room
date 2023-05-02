module.exports = (io, rooms) => {
  // Initialize an array to hold the song index and time for each room
  const roomStates = rooms.map(() => ({
    songIndex: 0,
    songTime: 0,
  }));

  const roomMemberEmails = {}
  rooms.forEach(({id}) => {
    roomMemberEmails[id] = []
  })

  // for each room, keep an interval to keep track of the song time
  const songIntervals = rooms.map(() => null);

  // Define a function to start playing the song for a room
  const playSong = (roomIndex) => {
    const room = rooms[roomIndex];
    const state = roomStates[roomIndex];
    const song = room.songs[state.songIndex];

    if (!song) {
      return;
    }

    io.to(room.id).emit("new-song", {
      id: song.id,
      time: state.songTime,
    });

    // Start a new interval for the room
    songIntervals[roomIndex] = setInterval(() => {
      state.songTime++;

      if (state.songTime >= song.duration) {
        state.songIndex++;
        if (state.songIndex >= room.songs.length) {
          state.songIndex = 0;
        }

        state.songTime = 0;

        clearInterval(songIntervals[roomIndex]);

        playSong(roomIndex);
      }
    }, 1000);
  };

  // Start playing songs for each room
  rooms.forEach((room, index) => {
    playSong(index);
  });

  // Whenever a new user joins, send the current song url, title and played upto time to the client
  io.on("connection", (socket) => {
    socket.on("join-room", (roomId) => {
      console.log(`${socket.user.name} joined room ${roomId}`);
      // TODO send list of members
      if (!roomMemberEmails[roomId].includes(socket.user.email))  {
        roomMemberEmails[roomId].push(socket.user.email)
      }
      console.log(roomMemberEmails[roomId])
      socket.join(roomId);
      io.to(roomId).emit("room-member-emails", roomMemberEmails[roomId])
    });

    socket.on("leave-room", (roomId) => {
      console.log(`${socket.user.name} left room ${roomId}`);
      // TODO remove user and send list of members
      const index = roomMemberEmails[roomId].indexOf(socket.user.email)
      index !== -1 && roomMemberEmails[roomId].splice(index, 1)
      io.to(roomId).emit("room-member-emails", roomMemberEmails[roomId])
      socket.leave(roomId);
    });

    socket.on("get-song-for-room", (roomId) => {
      const roomIndex = rooms.findIndex((room) => room.id === roomId);
      if (roomIndex !== -1) {
        const state = roomStates[roomIndex];
        const song = rooms[roomIndex].songs[state.songIndex];
        console.log("Sending songs");
        socket.emit("song", {
          id: song.id,
          time: state.songTime,
        });
      }
    });
  });
};
