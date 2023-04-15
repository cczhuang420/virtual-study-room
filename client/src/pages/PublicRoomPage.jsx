import Page from "../containers/Page.jsx";
import React from "react";
import { Box } from "@mui/material";

const PublicRoomPage = () => {
  return (
    <Page title={"Public Room"} horizontalCenter>
      <Box sx={{ color: "white" }} width={"100%"}>
        Public Room Page
      </Box>
    </Page>
  );
};

export default PublicRoomPage;
