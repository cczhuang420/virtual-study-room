module.exports = (io, rooms) => {
  // Initialize an array to hold the song index and time for each room
  const roomStates = rooms.map(() => ({
    songIndex: 0,
    songTime: 0,
  }));

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
      buffer: song.buffer,
      title: song.title,
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

    socket.on("join-room", (roomId) => {
      socket.join(roomId);
    });
  });
};
