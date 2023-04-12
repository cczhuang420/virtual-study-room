import Page from "../containers/Page.jsx";
import React from "react";
import { Box } from "@mui/material";
import FriendCard from "../components/FriendCard.jsx";
import profileImage from "../assets/temp-profile-image.svg"

const PublicRoomPage = () => {
  return (
    <Page title={"Public Room"}>
      <Box sx={{ color: "white" }} width={"100%"}>
        Public Room Page
      </Box>
      <FriendCard profileImage={profileImage} name={"Mike"} />
    </Page>
  );
};

export default PublicRoomPage;
