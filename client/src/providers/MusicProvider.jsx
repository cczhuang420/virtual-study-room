import { useState, createContext, useContext, useRef } from "react";
import YouTube from "react-youtube";

const context = createContext({});

const MusicProvider = ({ children }) => {
  const [videoId, setVideoId] = useState("");
  const [time, setTime] = useState(0);
  const youtubeRef = useRef(null);

  const playMusic = (id, time) => {
    setVideoId(id);
    setTime(time);
    youtubeRef.current.internalPlayer.playVideo();
  };

  const pauseMusic = () => {
    youtubeRef.current.internalPlayer.pauseVideo();
  };

  return (
    <context.Provider
      value={{
        playMusic,
        pauseMusic,
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
