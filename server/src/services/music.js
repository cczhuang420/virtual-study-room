const path = require("path");
const fs = require("fs");
const ytdl = require("ytdl-core");

const ConfigureMusicService = (callback) => {
  fs.readFile(
    path.join(__dirname, "..", "..", "songs.json"),
    "utf-8",
    (err, data) => {
      if (err) {
        console.log("Error reading songs.json because: ", err);
      } else {
        // read in data as array of rooms
        const {
          data: { rooms },
        } = JSON.parse(data);

        // Shuffle songs in each room
        for (let room in rooms) {
          rooms[room].songs = rooms[room].songs.sort(() => Math.random() - 0.5);
        }

        // for each room, use ytdl to get the song's title, and duration
        const songsWithInfo = rooms.map(async (room) => {
          const songsWithInfo = await Promise.all(
            room.songs.map(async (songUrl) => {
              const info = await ytdl.getBasicInfo(songUrl);

              return {
                id: info.videoDetails.videoId,
                duration: info.videoDetails.lengthSeconds,
              };
            })
          );
          return { ...room, songs: songsWithInfo };
        });

        Promise.all(songsWithInfo).then((processedRooms) => {
          callback(processedRooms);
        });
      }
    }
  );
};

module.exports = { ConfigureMusicService };
