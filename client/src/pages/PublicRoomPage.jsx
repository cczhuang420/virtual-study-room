import Page from "../containers/Page.jsx";
import React from "react";
import { Box } from "@mui/material";
import FriendContainer from "../components/FriendContainer.jsx";
import AssetLabel from "../components/AssetLabel.jsx";
import AssetXPIcon from "../assets/asset-xp-icon.svg";
import AssetMoneyIcon from "../assets/asset-money-icon.svg";
import PublicRoomsContainer from "../components/studyRooms/PublicRoomsContainer.jsx";

const PublicRoomPage = () => {
  return (
    <Page title={"Public Room"} horizontalCenter>
      <Box className="flex flex-1 flex-row flex-auto justify-start h-full w-full">
        <Box
          sx={{
            minWidth: 180,
            maxWidth: 250,
          }}
          className="w-1/2 h-full"
        >
          <FriendContainer />
        </Box>

        <Box className="flex flex-col mt-10 ml-20 mr-20 w-full space-y-10">
          <Box
            className="w-96 h-8 flex flex-row justify-end space-x-6 ml-auto"
            sx={{ minWidth: 300 }}
          >
            <AssetLabel image={AssetXPIcon} value={13000} />
            <AssetLabel image={AssetMoneyIcon} value={12000} />
          </Box>

          <Box>
            <PublicRoomsContainer />
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default PublicRoomPage;
