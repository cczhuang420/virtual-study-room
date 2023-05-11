import { useState, useEffect, createContext, useContext, useRef } from "react";
import YouTube from "react-youtube";

const context = createContext({});

const MusicProvider = ({ children }) => {
  const [videoId, setVideoId] = useState("");
  const [time, setTime] = useState(0);
  const [playList, setPlayList] = useState([]);
  const youtubeRef = useRef(null);

  const playMusic = (id, time) => {
    setVideoId(id);
    setTime(time);
    youtubeRef.current.internalPlayer.playVideo();

    // if the music is played from the playlist, then continue playing the next music
    if (playList.length > 0) {
      const index = playList.findIndex((song) => song.id === id);
      if (index !== -1) {
        // start play the next music or the first music if the current music is the last one
        const nextSong = playList[(index + 1) % playList.length];
        setVideoId(nextSong.id);
        setTime(0);
      }
    }
  };

  const startPlayList = (songs) => {
    setPlayList(songs);
    const firstSong = songs[0];
    playMusic(firstSong.id, 0);
  };

  const pauseMusic = () => {
    youtubeRef.current.internalPlayer.pauseVideo();
  };

  const stopMusic = () => {
    youtubeRef.current.internalPlayer.stopVideo();
  };

  return (
    <context.Provider
      value={{
        startPlayList,
        playMusic,
        pauseMusic,
        stopMusic,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-1000px",
          left: "-1000px",
          zIndex: "-1000",
        }}
      >
        <YouTube
          ref={youtubeRef}
          videoId={videoId}
          opts={{
            playerVars: {
              autoplay: 1,
              start: time,
            },
          }}
          onReady={(event) => {
            event.target.pauseVideo();
          }}
        />
      </div>
      {children}
    </context.Provider>
  );
};

export default MusicProvider;

export const useMusic = () => {
  return useContext(context);
};
