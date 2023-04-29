import Page from "../containers/Page.jsx";
import React, { useState } from "react";
import { Avatar, Box, Stack } from "@mui/material";
import AssetPanel from "../components/AssetPanel.jsx";
import moneyIcon from "../assets/asset-money-icon.svg";
import xpIcon from "../assets/asset-xp-icon.svg";
import AssetLabel from "../components/AssetLabel.jsx";
import ModifiableTextField from "../components/ModifiableTextField.jsx";
import avatar from "../assets/profiles/Frank.svg";
import { useAuth } from "../providers/AuthProvider.jsx";
import { useFetch } from "../hooks/useFetch.js";
import ProgressLoading from "../components/ProgressLoading";

const ProfilePage = () => {
  const [nickName, setNickname] = useState("");

  const { getCustomUser } = useAuth();

  const { data: backgroundImages, isLoading: backgroundLoading } = useFetch(
    `users/assets?userId=${getCustomUser()._id}&type=background`
  );

  const { data: profileImages, isLoading: profileImageLoading } = useFetch(
    `users/assets?userId=${getCustomUser()._id}&type=profile-image`
  );

  const { data: musics, isLoading: musicLoading } = useFetch(
    `users/assets?userId=${getCustomUser()._id}&type=music`
  );

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
              src={`/src/assets/profiles/${getCustomUser().profile}`}
              sx={{
                width: 200,
                height: 200,
              }}
            />
          </Box>
          <Stack
            mt={8}
            direction={"row"}
            width={{ xs: "90%", sx: "78%", md: "70%" }}
            spacing={2}
            height={{ xs: "18%", sx: "10%", md: "5%" }}
          >
            <AssetLabel image={moneyIcon} value={getCustomUser().coins} />
            <AssetLabel image={xpIcon} value={getCustomUser().experience} />
          </Stack>
          <Box
            mt={8}
            width={{ xs: "90%", sm: "78%", md: "90%" }}
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
        <Box
          p={5}
          height={"100%"}
          flex={2}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {profileImageLoading || musicLoading || backgroundLoading ? (
            <ProgressLoading />
          ) : (
            <AssetPanel
              backgrounds={backgroundImages}
              musics={musics}
              profilePhotos={profileImages}
            />
          )}
        </Box>
      </Box>
    </Page>
  );
};

export default ProfilePage;
