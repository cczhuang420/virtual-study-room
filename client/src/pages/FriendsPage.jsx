import Page from "../containers/Page.jsx";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";
import ChatModal from "../components/ChatModal.jsx";
import { useAuth } from "../providers/AuthProvider.jsx";
import { useSocket } from "../providers/SocketProvider.jsx";
import Mike from "../assets/profiles/Mike.svg";
import Frank from "../assets/profiles/Frank.svg";
import PrivateRoomsContainer from "../components/studyRooms/PrivateRoomsContainer.jsx";

const FriendsPage = () => {
  const { friendId } = useParams();

  const { getCurrentUser } = useAuth();
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on("message", (data) => {
      console.log(data);
    });

    return () => socket.off("message");
  }, [socket]);

  const handleSendChat = (message) => {
    socket.emit("send-message", {
      senderId: getCurrentUser().uid,
      receiverEmail: "1@3.com",
      profileImageUrl: Frank,
      message: message,
      timestamp: Date.now(),
    });
  };

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
            <Button
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
                minWidth: 180,
              }}
            >
              {friendId}'s Rooms
            </Button>
          </Box>
          <Box className="flex flex-1 flex-row flex-auto justify-start w-full h-5/6 mt-5 ml-5">
            <PrivateRoomsContainer isCreateRoom={false} />
          </Box>
        </Box>
        <Box
          sx={{ width: "35%", height: "95%", minWidth: 200 }}
          className={"mr-2 mt-4 w-1/3"}
        >
          <ChatModal
            chatHistory={[
              {
                senderId: getCurrentUser().uid,
                profileImageUrl: Frank,
                content: "Hello Mike, how are you?",
              },
              {
                senderId: "Ny8XNK3lW4b3YAJf8vcMPL5q7fl1",
                profileImageUrl: Mike,
                content: "I am fine, thank you and you",
              },
            ]}
            targetUser={{
              name: "Mike Ma",
              uid: "Ny8XNK3lW4b3YAJf8vcMPL5q7fl1",
            }}
            userList={[
              {
                name: "Xiaoxiao Zhuang ".repeat(2),
                uid: "Ny8XNK3lW4b3YAJf8vcMPL5q7fl1",
                isOnline: true,
              },
              {
                name: "Mike",
                uid: "Ny8XNK3lW4b3YAJf8vcMPL5q7fl1",
                isOnline: false,
              },
            ]}
            onSend={handleSendChat}
          />
        </Box>
      </Box>
    </Page>
  );
};

export default FriendsPage;
