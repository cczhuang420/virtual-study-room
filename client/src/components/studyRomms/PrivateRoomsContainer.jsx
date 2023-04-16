import { Box } from "@mui/material";
import RoomCard from "../RoomCard.jsx";
import StudyRoombackground from "../../assets/study-room-bg.svg";
import RoomCreater from "../RoomCreater.jsx";
import React from "react";

const PrivateRoomsContainer = () => {
  // TODO: ADD this handler
  const handleOpenRoom = () => {
    alert("open");
  };
  return (
    <Box className="flex flex-row flex-wrap h-full">
      <Box
        sx={{ minWidth: 200, maxHeight: 250, minHeight: 200 }}
        className="w-5/12 h-1/2 m-5"
      >
        <RoomCard
          title="Private Room 1"
          showLockIcon={true}
          showPeopleAmount={false}
          image={StudyRoombackground}
          showVagueBackground={true}
          onClick={handleOpenRoom}
        />
      </Box>
      <Box
        sx={{ minWidth: 200, maxHeight: 250, minHeight: 200 }}
        className="w-5/12 h-1/2 m-5"
      >
        <RoomCard
          title="Private Room 2"
          showLockIcon={true}
          showPeopleAmount={false}
          image={StudyRoombackground}
          showVagueBackground={true}
          onClick={handleOpenRoom}
        />
      </Box>

      <Box
        sx={{ minWidth: 200, maxHeight: 250, minHeight: 200 }}
        className="w-5/12 h-1/2 m-5"
      >
        <RoomCard
          title="Private Room 3"
          showLockIcon={true}
          showPeopleAmount={false}
          image={StudyRoombackground}
          showVagueBackground={true}
          onClick={handleOpenRoom}
        />
      </Box>

      <Box
        sx={{ minWidth: 200, maxHeight: 250, minHeight: 200 }}
        className="w-5/12 h-1/2 m-5"
      >
        <RoomCreater onClick={() => alert("add new room")} />
      </Box>
    </Box>
  );
};

export default PrivateRoomsContainer;
