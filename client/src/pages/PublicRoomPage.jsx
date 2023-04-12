import Page from "../containers/Page.jsx";
import React from "react";
import { Box } from "@mui/material";
import ChatModal from "../components/ChatModal.jsx";
import profileImage from "../assets/temp-profile-image.svg"

const PublicRoomPage = () => {
  return (
    <Page title={"Public Room"} horizontalCenter>
      <Box sx={{width: "300px", height: "600px"}}>
        <ChatModal
          chatHistory={[
            {
              senderId: "Ny8XNK3lW4b3YAJf8vcMPL5q7fl1",
              profileImageUrl: profileImage,
              content: "Hello"
            },
            {
              senderId: "Ny8XNK3lW4b3YAJf8vcMPL5q7fl1",
              profileImageUrl: profileImage,
              content: "How are you"
            },
            {
              senderId: "Ny8XNK3lW4b3YAJf8vcMPL5q7fl1",
              profileImageUrl: profileImage,
              content: "I am fine"
            },
            {
              senderId: "Ny8XNK3lW4b3YAJf8vcMPL5q7fl1",
              profileImageUrl: profileImage,
              content: "Thank you"
            },
            {
              senderId: "Ny8XNK3lW4b3YAJf8vcMPL5q7fl1",
              profileImageUrl: profileImage,
              content: "And you"
            },
            {
              senderId: "Ny8XNK3lW4b3YAJf8vcMPL5q7fl1",
              profileImageUrl: profileImage,
              content: "I am fine too"
            }
          ]}
          targetUser={{name: "Mike", isOnline: true}}
          onSend={(message) => alert(message)}
        />
      </Box>
      <Box sx={{ color: "white" }} width={"100%"}>
        Public Room Page
      </Box>
    </Page>
  );
};

export default PublicRoomPage;
