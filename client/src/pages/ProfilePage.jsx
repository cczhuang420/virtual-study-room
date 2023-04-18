import Page from "../containers/Page.jsx";
import React, { useState } from "react";
import { Avatar, Box, Stack } from "@mui/material";
import AssetPanel from "../components/AssetPanel.jsx";
import moneyIcon from "../assets/asset-money-icon.svg";
import xpIcon from "../assets/asset-xp-icon.svg";
import AssetLabel from "../components/AssetLabel.jsx";
import ModifiableTextField from "../components/ModifiableTextField.jsx";
import img1 from "../assets/backgroundRoom.svg";
import img2 from "../assets/background-card.svg";
import avatar from "../assets/Frank.svg";

const ProfilePage = () => {
  const [nickName, setNickname] = useState("");

  //fake data, will be replaced by the data which fetch from the backend
  const backgroundsImage = [
    img1,
    img2,
    img1,
    img2,
    img2,
    img1,
    img1,
    img2,
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
      <Box
        display={"flex"}
        flexDirection={{ xs: "column", md: "row" }}
        height={"100vh"}
        width={"100%"}
      >
        <Box
          flex={1}
          display={"flex"}
          flexDirection={"column"}
          p={8}
          height={"100%"}
          alignItems={"center"}
        >
          <Box>
            <Avatar
              src={avatar}
              sx={{
                width: 200,
                height: 200,
              }}
            />
          </Box>
          <Stack
            mt={8}
            direction={"row"}
            width={{ xs: "65%", sx: "78%", md: "70%" }}
            spacing={2}
            height={{ xs: "14%", sx: "10%", md: "5%" }}
          >
            <AssetLabel image={moneyIcon} value={1340} />
            <AssetLabel image={xpIcon} value={2300} />
          </Stack>
          <Box
            mt={8}
            width={{ xs: "80%", sm: "78%", md: "90%" }}
            height={{ xs: "40%", sm: "20%", md: "10%" }}
          >
            <ModifiableTextField
              label={"Nickname"}
              value={nickName}
              onSubmitChange={(value) => {
                setNickname(value);
              }}
            />
          </Box>
        </Box>
        <Box p={5} height={"100%"} flex={2}>
          <AssetPanel
            backgrounds={backgroundsImage}
            musics={musics}
            profilePhotos={backgroundsImage}
          />
        </Box>
      </Box>
    </Page>
  );
};

export default ProfilePage;
