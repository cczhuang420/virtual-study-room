import { Howl } from "howler";

let currentSound = null;

const play = (song) => {
  if (currentSound) {
    currentSound.stop();
  }

  // create src url with song.buffer
  const url = URL.createObjectURL(new Blob([song.buffer]));

  currentSound = new Howl({
    src: [url],
    html5: true,
    format: ["mp3"],
  });

  seek(song.time);
  currentSound.volume(0.1);
  currentSound.play();
};

const pause = () => {
  if (currentSound) {
    currentSound.pause();
  }
};

const resume = () => {
  if (currentSound) {
    currentSound.play();
  }
};

const stop = () => {
  if (currentSound) {
    currentSound.stop();
  }
};

const seek = (time) => {
  if (currentSound) {
    currentSound.seek(time);
  }
};

const getSongInfo = async (url) => {
  const info = await ytdl.getInfo(url);
  return {
    url: info.videoDetails.video_url,
    title: info.videoDetails.title,
    duration: info.videoDetails.lengthSeconds,
  };
};

export { play, pause, resume, stop, seek, getSongInfo };
