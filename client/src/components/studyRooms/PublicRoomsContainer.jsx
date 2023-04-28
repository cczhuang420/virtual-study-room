import { Box } from "@mui/material";
import RoomCard from "../RoomCard.jsx";
import StudyRoombackground from "../../assets/study-room-bg.svg";
import React from "react";
import { useSocket } from "../../providers/SocketProvider.jsx";
import {useFetch} from "../../hooks/useFetch.js";

const PublicRoomsContainer = () => {
  const socket = useSocket();
  const {isLoading, data: publicRooms} = useFetch("publicRooms")

  const handleOpenRoom = () => {
    socket.emit("join-room", "relaxing-01");
    socket.emit("get-song-for-room", "relaxing-01");
  };

  if (isLoading) return null
  console.log(publicRooms)
  return (
    <Box className="flex flex-row flex-wrap h-full">
      {publicRooms.map(({name, users, backgroundUrl}) => (
        <Box
          sx={{ minWidth: 200, maxHeight: 250, minHeight: 200 }}
          className="w-5/12 h-1/2 m-5"
        >
          <RoomCard
            title={name}
            showLockIcon={false}
            showPeopleAmount={true}
            image={StudyRoombackground}
            amount={users.length}
            showVagueBackground={true}
            onClick={handleOpenRoom}
          />
        </Box>
      ))}
    </Box>
  );
};

export default PublicRoomsContainer;
