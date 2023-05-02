import { useState, useEffect, createContext, useContext, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../providers/AuthProvider.jsx";
import { useNotification } from "./NotificationProvider.jsx";
import { useMusic } from "./MusicProvider.jsx";

const context = createContext({});

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { getCurrentUser } = useAuth();
  const notify = useNotification();
  const { playMusic, pauseMusic } = useMusic();

  useEffect(() => {
    if (getCurrentUser()) {
      const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL;

      const newSocket = io(SOCKET_SERVER_URL, {
        auth: {
          token: getCurrentUser().accessToken,
        },
      });

      newSocket.on("song", (song) => {
        console.log("song", song);
        playMusic(song.id, song.time);
      });

      newSocket.on("new-song", (song) => {
        console.log("new-song", song);
        playMusic(song.id, song.time);
      });

      newSocket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
        pauseMusic();
      });

      newSocket.on("disconnect", () => {
        console.log("disconnect from socket server");
        pauseMusic();
      });

      setSocket(newSocket);
      return () => {
        newSocket.disconnect();
        pauseMusic();
      };
    }
  }, [getCurrentUser()]);

  return <context.Provider value={socket}>{children}</context.Provider>;
};

export default SocketProvider;

export const useSocket = () => {
  return useContext(context);
};
