import { useState, useEffect, createContext } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../providers/AuthProvider.jsx";
import { Howl } from "howler";

const context = createContext({});
let sound = null;

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

      const buffer = [];
      newSocket.on("music-chunk", (chunk) => {
        buffer.push(chunk);
      });

      newSocket.on("music-end", () => {
        const blob = new Blob(buffer, { type: "audio/mp3" });
        const url = URL.createObjectURL(blob);
        sound = new Howl({
          src: [url],
          html5: true,
          format: ["mp3"],
          autoplay: true,
          loop: true,
        });
        sound.play();
      });

      newSocket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });

      newSocket.on("disconnect", () => {
        console.log("disconnect");
        if (sound) {
          sound.stop();
          sound.unload();
        }
      });

      setSocket(newSocket);
      return () => newSocket.disconnect();
    }
  }, [getCurrentUser]);

  return <context.Provider value={socket}>{children}</context.Provider>;
};

export default SocketProvider;

export const useSocket = () => {
  return useContext(context);
};
