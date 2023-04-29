import { useState, useEffect, createContext, useContext } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../providers/AuthProvider.jsx";
import { play, pause, stop } from "../utils/musicPlayer.js";

const context = createContext({});

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

      newSocket.on("song", (song) => {
        console.log("song", song);
        play(song);
      });

      newSocket.on("new-song", (song) => {
        console.log("new-song", song);
        play(song);
      });

      newSocket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
        stop();
      });

      newSocket.on("disconnect", () => {
        console.log("disconnect from socket server");
        stop();
      });

      setSocket(newSocket);
      return () => {
        newSocket.disconnect();
        stop();
      };
    }
  }, [getCurrentUser, getCurrentUser()]);

  return <context.Provider value={socket}>{children}</context.Provider>;
};

export default SocketProvider;

export const useSocket = () => {
  return useContext(context);
};
