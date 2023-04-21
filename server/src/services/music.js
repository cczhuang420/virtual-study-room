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
            room.songs.map(async (song) => {
              const info = await ytdl.getInfo(song);

              // download the song
              const stream = await ytdl(song, { filter: "audioonly" });

              let buffer = await new Promise((resolve, reject) => {
                const buffers = [];
                stream.on("data", (data) => buffers.push(data));
                stream.on("end", () => resolve(Buffer.concat(buffers)));
                stream.on("error", reject);
              });

              return {
                buffer,
                title: info.videoDetails.title,
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
