import Page from "../containers/Page.jsx";
import React from "react";
import { Box, Button } from "@mui/material";
import ChatModal from "../components/ChatModal.jsx";
import { useAuth } from "../providers/AuthProvider.jsx";
import Mike from "../assets/profiles/Mike.svg";
import Frank from "../assets/profiles/Frank.svg";
import PrivateRoomsContainer from "../components/studyRooms/PrivateRoomsContainer.jsx";
import {useFetch} from "../hooks/useFetch.js";

const FriendsPage = ({ id }) => {
    const {getCustomUser} = useAuth();

    const {data, isLoading} = useFetch(`privateRooms?owner=${id}`);
    const privateRoomsTemp = isLoading ? [] : data;
    const privateRooms = privateRoomsTemp.filter((e) => e.isVisibleToFriends === true)

    const {data: userData, isLoading: userIsLoading} = useFetch(`users?_id=${id}`);
    const friend = userIsLoading ? {} : userData[0];

    const {data: chatData, isLoading: chatIsLoading} = useFetch(`chats?myId=${getCustomUser()._id}&customerId=${id}`);
    const chatHistoryTemp = chatIsLoading ? [] : chatData.sort((a,b) => (a.timestamp - b.timestamp));
    //console.log(chatHistoryList);
    const chatHistoryList = chatHistoryTemp.map((item, index) => {
        return { senderId: item.sender, profileImageUrl: item.sender === getCustomUser()._id ? getCustomUser().profile : friend.profile, content : item.message };
    });
    console.log(chatHistoryList);

  return (
    <Page title={"Friends Page"}>
      <Box
        padding={2}
        marginTop={2}
        display={"flex"}
        flexDirection={"row"}
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box
              sx={{
                borderRadius: "25px",
                backgroundColor: "#1B0137",
                textAlign: "center",
                fontWeight: "large",
                fontSize: "1em",
                color: "white",
                overflow: "hidden",
                textTransform: "none",
                width: "30%",
                  paddingY: "1%",
                minWidth: 180,
              }}
            >
              {friend.username}'s Rooms
            </Box>
          </Box>
          <Box className="flex flex-1 flex-row flex-auto justify-start w-full h-5/6 mt-5 ml-5">
            <PrivateRoomsContainer privateRooms={privateRooms} isCreateRoom={false} />
          </Box>
        </Box>
        <Box
          sx={{ width: "35%", height: "95%", minWidth: 200 }}
          className={"mr-2 mt-4 w-1/3"}
        >
          <ChatModal
            chatHistory={chatHistoryList}
            targetUser={{
              name: friend.username,
              uid: friend._id,
            }}
            userList={[]}
            onSend={(message) => alert(message)}
          />
        </Box>
      </Box>
    </Page>
  );
};

export default FriendsPage;
