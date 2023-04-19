import Page from "../containers/Page.jsx";
import React from "react"
import { Box, Button, } from "@mui/material";
import ChatModal from "../components/ChatModal.jsx";
import { useAuth } from "../providers/AuthProvider.jsx";
import Mike from "../assets/Mike.svg";
import Frank from "../assets/Frank.svg";
import PrivateRoomsContainer from "../components/studyRooms/PrivateRoomsContainer.jsx";

const FriendsPage = ({ id }) => {
  const { getCurrentUser } = useAuth()
  return (
    <Page title={"Friends Page"}>
      <Box
        padding={2}
        display={"flex"}
        flexDirection={"row"}
        sx={{
          width: "100%",
          height: "100%"
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%"
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
                textTransform: 'none',
                width: "30%",
              }}>
              {id}'s Rooms
            </Button>
          </Box>
          <Box className="flex flex-1 flex-row flex-auto justify-start h-full w-full">
            <PrivateRoomsContainer isCreateRoom={false} />
          </Box>
        </Box>
        <Box sx={{ width: "35%", height: "100%" }}>
          <ChatModal
            chatHistory={[
              {
                senderId: getCurrentUser().uid,
                profileImageUrl: Frank,
                content: "Hello Mike, how are you?"
              },
              {
                senderId: "Ny8XNK3lW4b3YAJf8vcMPL5q7fl1",
                profileImageUrl: Mike,
                content: "I am fine, thank you and you"
              },
            ]}
            targetUser={{ name: "Mike Ma", uid: "Ny8XNK3lW4b3YAJf8vcMPL5q7fl1" }}
            userList={[
              { name: "Xiaoxiao Zhuang ".repeat(2), uid: "Ny8XNK3lW4b3YAJf8vcMPL5q7fl1", isOnline: true },
              { name: "Mike", uid: "Ny8XNK3lW4b3YAJf8vcMPL5q7fl1", isOnline: false },
            ]}
            onSend={(message) => alert(message)}
          />
        </Box>

      </Box>

    </Page>
  )
}

export default FriendsPage
