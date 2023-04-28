import { Box } from "@mui/material";
import RoomCard from "../RoomCard.jsx";
import StudyRoombackground from "../../assets/study-room-bg.svg";
import React from "react";
import { useSocket } from "../../providers/SocketProvider.jsx";
import {useFetch} from "../../hooks/useFetch.js";
import {useNavigate} from "react-router-dom";

const PublicRoomsContainer = () => {
  const socket = useSocket();
  const {isLoading, data: publicRooms} = useFetch("publicRooms")
  const navigate = useNavigate()

  const handleOpenRoom = (id) => {
    navigate(`/rooms/${id}`)
    // Logic to play music and join room with socket server is moved to StudyingRoomPage useEffect
  };

  if (isLoading) return null

  return (
    <Box className="flex flex-row flex-wrap h-full">
      {publicRooms.map(({_id, name, users, backgroundUrl}) => (
        <Box
          key={_id}
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
            onClick={() => handleOpenRoom(_id)}
          />
        </Box>
      ))}
    </Box>
  );
};

export default PublicRoomsContainer;
