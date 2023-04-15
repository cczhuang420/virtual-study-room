import { createContext } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = import.meta.env.VITE_SERVICE_URL;

const socket = io("http://localhost:4000");

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

const context = createContext({});

const SocketProvider = ({ children }) => {
  return <context.Provider value={socket}>{children}</context.Provider>;
};

export default SocketProvider;

export const useSocket = () => {
  return useContext(context);
};
