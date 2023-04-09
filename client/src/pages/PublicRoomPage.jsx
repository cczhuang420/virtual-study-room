import Page from "../containers/Page.jsx";
import React from "react";
import { Box } from "@mui/material";
import RoomCard from "../components/RoomCard.jsx";
import backgroundRoom from "../assets/backgroundRoom.svg";
import RoomCreater from "../components/RoomCreater.jsx";

const PublicRoomPage = () => {
  return (
    <Page title={"Public Room"}>
      <Box sx={{ color: "white" }}>Public Room Page</Box>
    </Page>
  );
};

export default PublicRoomPage;
