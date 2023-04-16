import React from "react"
import Page from "../containers/Page.jsx";
import {useParams} from "react-router-dom";
import roomBg from "../assets/study-room-bg.svg"
import {Box, Button, Grid} from "@mui/material"
import mikeProfile from "../assets/Mike.svg"
import RoomUserCard from "../components/RoomUserCard.jsx";
import logo from "../assets/logo.svg";
import TodoList from "../components/TodoList";
import ChatModal from "../components/ChatModal.jsx";
import {useAuth} from "../providers/AuthProvider.jsx";

const roomUsers = Array(10).fill({
  name: "Mike Ma",
  image: mikeProfile,
  xpValue: Math.round(Math.random() * 10000),
  onChat: () => alert("This is Mike")
})

const mockUserList = [
  {name: "Mike", uid: "Ny8XNK3lW4b3YAJf8vcMPL5q7fl1", isOnline: true},
  {name: "Mike", uid: "Ny8XNK3lW4b3YAJf8vcMPL5q7fl1", isOnline: false},
  {name: "Mike", uid: "Ny8XNK3lW4b3YAJf8vcMPL5q7fl1", isOnline: true}
]

const targetUser = {name: "Mike", uid: "Ny8XNK3lW4b3YAJf8vcMPL5q7fl1"}

const StudyingRoomPage = () => {

  const {roomId} = useParams()

  const {getCurrentUser} = useAuth()

  const mockChatHistory = [
    {
      senderId: getCurrentUser().uid,
      profileImageUrl: mikeProfile,
      content: "Hello"
    },
    {
      senderId: getCurrentUser().uid,
      profileImageUrl: mikeProfile,
      content: "How are you"
    },
    {
      senderId: "Ny8XNK3lW4b3YAJf8vcMPL5q7fl1",
      profileImageUrl: mikeProfile,
      content: "I am fine"
    },
    {
      senderId: "Ny8XNK3lW4b3YAJf8vcMPL5q7fl1",
      profileImageUrl: mikeProfile,
      content: "Thank you"
    },
    {
      senderId: "Ny8XNK3lW4b3YAJf8vcMPL5q7fl1",
      profileImageUrl: mikeProfile,
      content: "And you"
    },
    {
      senderId: getCurrentUser().uid,
      profileImageUrl: mikeProfile,
      content: "I am fine too"
    }
  ]

  return (
    <Page
      excludeNavigation
      title={`Virtual Study Room | Room ${roomId}`}
      sx={{maxHeight: "100vh"}}
    >
      <Box
        sx={{
          width: "100%",
          height: "90%",
          background: `url(${roomBg}) no-repeat center`,
          backgroundSize: "cover",
          display: "flex"
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backdropFilter: "blur(10px)",
            display: "flex",
            "&>*:nth-child(1)": {
              flex: 2
            },
            "&>*:nth-child(2)": {
              flex: 1
            },
          }}
        >
          <Box sx={{display: "flex", flexDirection: "column", position: "relative"}}>
            <Box sx={{position: "absolute", top: 1, left: 4}}>
              <img src={logo} alt={""} />
            </Box>
            <Box sx={{pl: 15, paddingY: 2}}>
              <Button
                variant={"contained"}
                sx={{
                  color: "white",
                  border: "2px solid #FFFFFF88",
                  backgroundColor:  "#FFFFFF32",
                  "&:hover": {
                    backgroundColor: "#FFFFFF50",
                  }
                }}
              >
                Sort by name
              </Button>
            </Box>
            <Box
              className={"hide-scroll-bar"}
              sx={{
                flex: 1,
                overflowY: "scroll"
              }}
            >
              <Grid container sx={{p: 10, pt: 1}}>
                {roomUsers.map((roomUser) => (
                  <Grid item xs={12} md={6} sx={{p: 5, pt: 0}} key={`${Math.random()}`}>
                    <RoomUserCard {...roomUser} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              c: "stretch",
              justifyContent: "stretch",
              height: "100%",
              flexDirection: "column",
              "&>*": {
                flex: 1,
                minHeight: 0,
                display: "flex",
                justifyContent: "stretch",
                alignItems: "stretch",
                flexDirection: "column",
                "&>*": { flex: 1 },
                paddingX: 3,
                paddingY: 2
              }
            }}
          >
            <Box>
              <TodoList />
            </Box>
            <Box>
              <ChatModal
                chatHistory={mockChatHistory}
                targetUser={targetUser}
                userList={mockUserList}
                onSend={(message) => alert(message)}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingX: 3,
          paddingY: 2,
          width: "100%"
        }}
      >
        <Box>
          <Button
            variant={"outlined"}
            sx={{
              color: "#FFFFFF88",
              border: "2px solid #FFFFFF88",
              "&:hover": {
                border: "2px solid #FFFFFF88",
                backgroundColor: "#FFFFFF11",
              }
            }}
          >
            Leave Room
          </Button>
        </Box>
        <Box>
          <Button
            variant={"contained"}
            sx={{
              color: "white",
              border: "2px solid #FFFFFF88",
              backgroundColor:  "#FFFFFF32",
              "&:hover": {
                backgroundColor: "#FFFFFF50",
              }
            }}
          >
            Set Timer
          </Button>
        </Box>
      </Box>
    </Page>
  )
}

export default StudyingRoomPage
