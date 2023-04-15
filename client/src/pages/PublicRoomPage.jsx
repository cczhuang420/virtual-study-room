import Page from "../containers/Page.jsx";
import React from "react";
import { Box } from "@mui/material";
import FriendContainer from "../components/FriendContainer.jsx";

const PublicRoomPage = () => {
  return (
    <Page title={"Public Room"}>
      <FriendContainer />
    </Page>
  );
};

export default PublicRoomPage;
