import Page from "../containers/Page.jsx";
import React, { useEffect, useState } from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import AssetPanel from "../components/AssetPanel.jsx";
import moneyIcon from "../assets/asset-money-icon.svg";
import xpIcon from "../assets/asset-xp-icon.svg";
import AssetLabel from "../components/AssetLabel.jsx";
import ModifiableTextField from "../components/ModifiableTextField.jsx";
import avatar from "../assets/profiles/Frank.svg";
import { useAuth } from "../providers/AuthProvider.jsx";
import { useFetch } from "../hooks/useFetch.js";
import ProgressLoading from "../components/ProgressLoading";
import { useMutation } from "../hooks/useMutation.js";
import { HTTP_METHOD } from "../hooks/http-methods.js";
import FriendRequestItem from "../components/FriendRequestItem.jsx";
import { useNotification } from "../providers/NotificationProvider.jsx";

const ProfilePage = () => {
  const { getCustomUser } = useAuth();
  const [username, setUserName] = useState(getCustomUser().username);

  const { data: backgroundImages, isLoading: backgroundLoading } = useFetch(
    `users/assets?userId=${getCustomUser()._id}&type=background`
  );

  const { data: profileImages, isLoading: profileImageLoading } = useFetch(
    `users/assets?userId=${getCustomUser()._id}&type=profile-image`
  );

  const { data: musics, isLoading: musicLoading } = useFetch(
    `users/assets?userId=${getCustomUser()._id}&type=music`
  );

  const { data: friendRequests, isLoading: friendLoading } = useFetch(
    `friends/requests?id=${getCustomUser()._id}`
  );

  const [friendRequestList, setFriendRequestList] = useState([]);

  useEffect(() => {
    if (!friendLoading) {
      setFriendRequestList(friendRequests);
    }
  }, [friendRequests, friendRequestList]);

  const { run } = useMutation(`users/updateName`, HTTP_METHOD.PUT);

  const { run: updateRequest } = useMutation(
    `friends/requests`,
    HTTP_METHOD.PUT
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
          px={8}
          py={4}
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
            mt={4}
            direction={"row"}
            width={{ xs: "90%", sx: "78%", md: "70%" }}
            spacing={2}
            height={{ xs: "18%", sx: "10%", md: "5%" }}
          >
            <AssetLabel image={moneyIcon} value={getCustomUser().coins} />
            <AssetLabel image={xpIcon} value={getCustomUser().experience} />
          </Stack>
          <Box
            mt={4}
            width={{ xs: "90%", sm: "78%", md: "100%" }}
            height={{ xs: "40%", sm: "20%", md: "10%" }}
          >
            <ModifiableTextField
              label={"username"}
              value={username}
              onSubmitChange={async (value) => {
                setUserName(value);
                await run({
                  body: {
                    userId: getCustomUser()._id,
                    name: value,
                  },
                });
              }}
            />
          </Box>

          <Box
            mt={3}
            p={1}
            width={{ xs: "90%", sm: "78%", md: "100%" }}
            minHeight={"35vh"}
            display={"flex"}
            flexDirection={"column"}
            sx={{
              backgroundColor: "#401f6a",
            }}
          >
            <Typography variant={"h6"} color={"#fff"}>
              Friend Request
            </Typography>
            <Box
              width={"100%"}
              height={"90%"}
              p={1}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              sx={{
                overflowY: "auto",
              }}
            >
              {friendLoading ? (
                <ProgressLoading />
              ) : friendRequestList.length === 0 ? (
                <Typography variant={"h5"} color={"#fff"}>
                  No friend request
                </Typography>
              ) : (
                friendRequestList.map((it, index) => (
                  <FriendRequestItem
                    key={index}
                    name={it.username}
                    onAcceptClick={async () => {
                      setFriendRequestList((pre) => pre.splice(index, 1));
                      await updateRequest({
                        query: {
                          id: getCustomUser()._id,
                          fid: it._id,
                          action: "approved",
                        },
                      });
                    }}
                    onRejectClick={async () => {
                      setFriendRequestList((pre) => pre.splice(index, 1));
                      await updateRequest({
                        query: {
                          id: getCustomUser()._id,
                          fid: it._id,
                          action: "rejected",
                        },
                      });
                    }}
                  />
                ))
              )}
            </Box>
          </Box>
        </Box>
        <Box
          p={4}
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
