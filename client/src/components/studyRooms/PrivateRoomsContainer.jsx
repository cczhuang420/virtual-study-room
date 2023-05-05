import {Box, Grid, Typography} from "@mui/material";
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
    <Grid container>
      {privateRooms.map(({ _id, name, backgroundUrl }, index) => (
        <Grid
          xs={6}
          key={_id}
          sx={{ minWidth: 200, maxHeight: 250, minHeight: 200, paddingX: 3, paddingY: 1 }}
        >
          <RoomCard
            title={name}
            showLockIcon={true}
            showPeopleAmount={false}
            image={`/src/assets/backgrounds/${backgroundUrl}`}
            showVagueBackground={true}
            onClick={() => handleOpenRoom(_id)}
          />
        </Grid>
      ))}

      {onAddNewRoom && (
        <Grid
          xs={6}
          sx={{minWidth: 200, maxHeight: 250, minHeight: 200, paddingX: 3, paddingY: 1 }}
        >
          {isCreateRoom && (<RoomCreater onClick={() => onAddNewRoom()}/>)}
        </Grid>
      )}
    </Grid>
  );
};

export default PrivateRoomsContainer;
