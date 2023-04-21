module.exports = (io, rooms) => {
  // Initialize an array to hold the song index and time for each room
  const roomStates = rooms.map(() => ({
    songIndex: 0,
    songTime: 0,
  }));

  // Define a function to start playing the song for a room
  const playSong = (roomIndex) => {
    const room = rooms[roomIndex];
    const state = roomStates[roomIndex];
    const song = room.songs[state.songIndex];

    if (!song) {
      return;
    }

    io.emit("new-song", {
      buffer: song.buffer,
      title: song.title,
      time: state.songTime,
    });

    const songInterval = setInterval(() => {
      state.songTime++;

      if (state.songTime >= song.duration) {
        state.songIndex++;
        if (state.songIndex >= room.songs.length) {
          state.songIndex = 0;
        }

        state.songTime = 0;

        clearInterval(songInterval);

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
    socket.on("get-song-for-room", (roomId) => {
      const roomIndex = rooms.findIndex((room) => room.id === roomId);

      if (roomIndex !== -1) {
        const state = roomStates[roomIndex];
        const song = rooms[roomIndex].songs[state.songIndex];

        socket.emit("song", {
          buffer: song.buffer,
          title: song.title,
          time: state.songTime,
        });
      }
    });
  });
};
