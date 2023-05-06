const ytdl = require("ytdl-core");
const publicRoomControllerClass = require("../publicRooms/publicRoom.controller");
const publicRoomController = new publicRoomControllerClass();

const ConfigureMusicService = async (callback) => {
  // Get all public rooms from database along with the songs in each room
  const publicRooms = await publicRoomController.getAllPublicRooms();

  const rooms = publicRooms.map((room) => {
    // shuffule the songs in each room
    room.playList = room.playList.sort(() => Math.random() - 0.5);

    return {
      id: room._id.toString(),
      songs: room.playList,
    };
  });

  // for each room, use ytdl to get the song's title, and duration
  const songsWithInfo = rooms.map(async (room) => {
    const songsWithInfo = await Promise.all(
      room.songs.map(async (songUrl) => {
        // ignore the song if it is not available
        if (!ytdl.validateURL(songUrl)) {
          return null;
        }

        const info = await ytdl.getBasicInfo(songUrl);

        return {
          id: info.videoDetails.videoId,
          duration: info.videoDetails.lengthSeconds,
        };
      })
    );

    // remove the songs that are not available
    for (let i = songsWithInfo.length - 1; i >= 0; i--) {
      if (!songsWithInfo[i]) {
        songsWithInfo.splice(i, 1);
      }
    }

    return { ...room, songs: songsWithInfo };
  });

  Promise.all(songsWithInfo).then((processedRooms) => {
    callback(processedRooms);
  });
};

const RetrieveSongsBasicInfo = async (songs) => {
  const songsWithInfo = await Promise.all(
    songs.map(async (songUrl) => {
      // ignore the song if it is not available
      if (!ytdl.validateURL(songUrl)) {
        return null;
      }

      const info = await ytdl.getBasicInfo(songUrl);

      return {
        id: info.videoDetails.videoId,
        duration: info.videoDetails.lengthSeconds,
      };
    })
  );

  // remove the songs that are not available
  for (let i = songsWithInfo.length - 1; i >= 0; i--) {
    if (!songsWithInfo[i]) {
      songsWithInfo.splice(i, 1);
    }
  }

  return songsWithInfo;
};

module.exports = { ConfigureMusicService, RetrieveSongsBasicInfo };
