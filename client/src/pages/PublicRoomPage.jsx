import Page from "../containers/Page.jsx";
import React from "react";
import { Box } from "@mui/material";
import ModifiableTextField from "../components/ModifiableTextField.jsx";


const PublicRoomPage = () => {
  return (
    <Page title={"Public Room"} horizontalCenter verticalCenter>
      <Box sx={{ color: "white" }}>Public Room Page</Box>
      <Box sx={{width: "250px", height: "60px"}}>
        <ModifiableTextField
          label={"USERNAME"}
          value={"Frank Ji"}
          onSubmitChange={(newValue) => alert(newValue)}
        />
      </Box>
    </Page>
  );
};

export default PublicRoomPage;
