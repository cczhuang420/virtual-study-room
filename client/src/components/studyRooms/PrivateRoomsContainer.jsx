import {Box, Typography} from "@mui/material";
import RoomCard from "../RoomCard.jsx";
import RoomCreater from "../RoomCreater.jsx";
import React from "react";
import {useNavigate} from "react-router-dom";

const PrivateRoomsContainer = ({ privateRooms = [], isCreateRoom = true, onAddNewRoom }) => {

  const navigate = useNavigate()

  const handleOpenRoom = (id) => {
    navigate(`/rooms/${id}`)
  };

  return (
    <Box className="flex flex-row flex-wrap h-full">
      {privateRooms.map(({ _id, name, backgroundUrl }, index) => (
        <Box
          key={_id}
          sx={{ minWidth: 200, maxHeight: 250, minHeight: 200 }}
          className="w-5/12 h-1/2 m-5"
        >
          <RoomCard
            title={name}
            showLockIcon={true}
            showPeopleAmount={false}
            image={`/src/assets/backgrounds/${backgroundUrl}`}
            showVagueBackground={true}
            onClick={() => handleOpenRoom(_id)}
          />
        </Box>
      ))}

      {onAddNewRoom && <Box
        sx={{minWidth: 200, maxHeight: 250, minHeight: 200}}
        className="w-5/12 h-1/2 m-5"
      >
        {isCreateRoom && (<RoomCreater onClick={() => onAddNewRoom()}/>)}
      </Box>}
    </Box>
  );
};

export default PrivateRoomsContainer;
