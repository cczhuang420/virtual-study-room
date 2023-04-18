import Page from "../containers/Page.jsx";
import React from "react";
import { Box } from "@mui/material";
import AssetPanel from "../components/AssetPanel.jsx";
import img1 from "../assets/backgroundRoom.svg";
import img2 from "../assets/background-card.svg";
import img3 from "../assets/backgroundRoom.svg";
import img4 from "../assets/background-card.svg";

const ProfilePage = () => {
  const backgroundsImage = [
    img1,
    img2,
    img3,
    img4,
    img2,
    img3,
    img1,
    img4,
    img1,
    img2,
  ];
  const musics = [
    {
      name: "鸡你太美",
      artist: "harryQu",
    },
    {
      name: "鸡你太美",
      artist: "harryQu",
    },
    {
      name: "鸡你太美",
      artist: "harryQu",
    },
    {
      name: "鸡你太美",
      artist: "harryQu",
    },
    {
      name: "鸡你太美",
      artist: "harryQu",
    },
    {
      name: "鸡你太美",
      artist: "harryQu",
    },
  ];

  return (
    <Page title={"Profile"}>
      {/*<Box></Box>*/}
      <Box p={5} minHeight={"100%"} minWidth={"65%"}>
        <AssetPanel
          backgrounds={backgroundsImage}
          musics={musics}
          profilePhotos={backgroundsImage}
        />
      </Box>
    </Page>
  );
};

export default ProfilePage;
