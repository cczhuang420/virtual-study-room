import Page from "../containers/Page.jsx";
import React from "react";
import { Box } from "@mui/material";
import FriendList from "../components/FriendList.jsx";
import Nino from "../assets/Nino.svg";
import Mike from "../assets/Mike.svg";
import Harry from "../assets/Harry.svg";
import Qingyang from "../assets/Qingyang.svg";
import CC from "../assets/CC.svg";
import Frank from "../assets/Frank.svg";

const PublicRoomPage = () => {
  return (
    <Page title={"Public Room"}>
      <Box sx={{ color: "white" }} width={"100%"}>
        Public Room Page
      </Box>
      <FriendList 
      friends={[
        {image: Frank, name: "Frank Ji"},
        {image: Mike, name: "马思琦"},
        {image: CC, name: "庄笑笑"},
        {image: Qingyang, name: "李青洋"},
        {image: Harry, name: "Harry Qu"},
        {image: Nino, name: "Yinuo Xue"},
      ]}
      />
    </Page>
  );
};

export default PublicRoomPage;
