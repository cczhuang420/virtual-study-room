import { useState, useEffect, createContext } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../providers/AuthProvider.jsx";
import { Howl } from "howler";

const context = createContext({});
let sound = null;
let musicTimer = null;

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { getCurrentUser } = useAuth();

  useEffect(() => {
    if (getCurrentUser()) {
      const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL;

      const newSocket = io(SOCKET_SERVER_URL, {
        auth: {
          token: getCurrentUser().accessToken,
        },
      });

      newSocket.emit("music:play");

      const buffer = [];
      newSocket.on("music-chunk", (chunk) => {
        buffer.push(chunk);
      });

      newSocket.on("music-end", (data) => {
        const blob = new Blob(buffer, { type: "audio/mp3" });
        const url = URL.createObjectURL(blob);

        sound = new Howl({
          src: [url],
          html5: true,
          format: ["mp3"],
          autoplay: true,
          loop: true,
          volume: 0.5,
        });

        sound.seek(data.positionToStart);
        sound.play();

        musicTimer = setInterval(() => {
          newSocket.emit("music:playBackPosition", { position: sound.seek() });
        }, 1000 * 5);
      });

      newSocket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);

        if (sound) {
          sound.stop();
          sound.unload();
        }

        if (musicTimer) {
          clearInterval(musicTimer);
        }
      });

      newSocket.on("disconnect", () => {
        console.log("disconnect");
        if (sound) {
          sound.stop();
          sound.unload();
        }

        if (musicTimer) {
          clearInterval(musicTimer);
        }
      });

      setSocket(newSocket);
      return () => {
        newSocket.disconnect();

        if (sound) {
          sound.stop();
          sound.unload();
        }
      };
    }
  }, [getCurrentUser]);

  return <context.Provider value={socket}>{children}</context.Provider>;
};

export default SocketProvider;

export const useSocket = () => {
  return useContext(context);
};
