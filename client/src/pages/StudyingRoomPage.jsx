import React, { useCallback, useEffect, useState, useMemo } from "react";
import Page from "../containers/Page.jsx";
import { useParams } from "react-router-dom";
import roomBg from "../assets/study-room-bg.svg";
import { Box, Button, Grid } from "@mui/material";
import mikeProfile from "../assets/profiles/Mike.svg";
import RoomUserCard from "../components/RoomUserCard.jsx";
import logo from "../assets/logo.svg";
import TodoList from "../components/TodoList";
import ChatModal from "../components/ChatModal.jsx";
import { useAuth } from "../providers/AuthProvider.jsx";
import { useSocket } from "../providers/SocketProvider.jsx";
import { stop } from "../utils/musicPlayer.js";
import {useFetch} from "../hooks/useFetch.js";
import {useMutation} from "../hooks/useMutation.js";
import {HTTP_METHOD} from "../hooks/http-methods.js";
import Timer from "../components/Timer.jsx";
import {useNotification} from "../providers/NotificationProvider.jsx";


const sortByOptions = [
  "name", "experience"
]

const StudyingRoomPage = (callback, deps) => {
  // array of {senderId, profileImageUrl, content}
  const [chatHistory, setChatHistory] = useState([])
  const [roomUsers, setRoomUsers] = useState([])
  const [sortBy, setSortBy] = useState("name")
  const [showTimer, setShowTimer] = useState(false)
  const [targetUser, setTargetUser] = useState({
    username: "All Users"
  })

  const { roomId } = useParams();
  const socket = useSocket();
  const { getCurrentUser, getCustomUser, reFetchUserData } = useAuth();
  const notify = useNotification()

  const {data: roomData, isLoading} = useFetch(`publicRooms/${roomId}`)
  const fetchUserHandler = useMutation("users", HTTP_METHOD.GET)
  const addExperienceHandler = useMutation("users/experience/add", HTTP_METHOD.PATCH)

  useEffect(() => {
    ;(async () => {
      if (!roomData || isLoading) return
      const userIds = roomData.users
      setRoomUsers(
        (await Promise.all(
          userIds.map(id => fetchUserHandler.run({
            query: { _id: id }
          }))
        ))
        .map(res => res[0])
        .map((user) => ({...user, profile: `/src/assets/profiles/${user.profile}`}))
      )

    })()
  }, [isLoading, roomData])

  const sortedRoomUsers = useMemo(() => {
    const users = roomUsers.map(u => ({...u}))
    users.sort((a, b) => {
      if (a[sortBy] > b[sortBy]) return 1
      if (a[sortBy] < b[sortBy]) return -1
      if (a[sortBy] === b[sortBy]) return 0
    })
    return users
  }, [sortBy, roomUsers])

  const leaveRoomHandler = useCallback(() => {
    history.back();
  }, []);

  const setTimerHandler = useCallback(() => {
    setShowTimer(true)
  }, []);

  const timerFinishHandler = useCallback(async () => {
    notify("Timer finished, reward earned")
    await addExperienceHandler.run({
      query: {
        userId: getCustomUser()._id
      }
    })
    await reFetchUserData()
    setShowTimer(false)
  }, [])

  const changeSortingHandler = useCallback(() => {
    const index = sortByOptions.findIndex(o => o === sortBy)
    const newValue = sortByOptions[(index + 1) % sortByOptions.length]
    setSortBy(newValue)
  }, [sortBy, setSortBy]);

  useEffect(() => {
    if (!socket) return
    socket.emit("join-room", roomId);
    socket.emit("get-song-for-room", roomId);

    socket.on("message-in-rooms", ({senderId, profileImageUrl, message}) => {
      setChatHistory(prevState => [...prevState, {
        senderId, profileImageUrl, content: message
      }])
    });

    return () => {
      socket.emit("leave-room", roomId);
      socket.off("message-in-rooms");
      stop();
    };
  }, [socket]);

  const handleSendGroupChat = (message) => {
    socket.emit("send-message-in-rooms", {
      roomId: roomId,
      senderId: getCurrentUser().uid,
      profileImageUrl: mikeProfile,
      message: message,
      timestamp: Date.now(),
    });
  };

  const handleChangeTargetUse = useCallback((user) => {
    setTargetUser(user)
  }, [setTargetUser])

  return (
    <Page
      excludeNavigation
      title={`Virtual Study Room | Room ${roomId}`}
      sx={{ maxHeight: "100vh" }}
    >
      <Box
        sx={{
          width: "100%",
          height: "90%",
          background: `url(${roomBg}) no-repeat center`,
          backgroundSize: "cover",
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backdropFilter: "blur(10px)",
            display: "flex",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              flex: 2,
            }}
          >
            <Box sx={{ position: "absolute", top: 1, left: 4 }}>
              <img src={logo} alt={""} />
            </Box>
            <Box sx={{ pl: 15, paddingY: 2 }}>
              <Button
                onClick={changeSortingHandler}
                variant={"contained"}
                sx={{
                  color: "white",
                  border: "2px solid #FFFFFF88",
                  backgroundColor: "#FFFFFF32",
                  "&:hover": {
                    backgroundColor: "#FFFFFF50",
                  },
                }}
              >
                Sort by {sortBy}
              </Button>
            </Box>
            <Box
              className={"hide-scroll-bar"}
              sx={{
                flex: 1,
                overflowY: "scroll",
              }}
            >
              <Grid container sx={{ p: 10, pt: 1 }}>
                {sortedRoomUsers.map((roomUser) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{ p: 5, pt: 0 }}
                    key={`${Math.random()}`}
                  >
                    <RoomUserCard {...roomUser} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
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
                paddingX: 8,
                paddingY: 2,
              },
            }}
          >
            <Box>
              <TodoList />
            </Box>
            <Box>
              <ChatModal
                chatHistory={chatHistory}
                targetUser={targetUser}
                userList={roomUsers}
                onSend={handleSendGroupChat}
                onChangeTargetUser={(user) => handleChangeTargetUse(user)}
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
          width: "100%",
        }}
      >
        <Box>
          <Button
            onClick={leaveRoomHandler}
            variant={"outlined"}
            sx={{
              color: "#FFFFFF88",
              border: "2px solid #FFFFFF88",
              "&:hover": {
                border: "2px solid #FFFFFF88",
                backgroundColor: "#FFFFFF11",
              },
            }}
          >
            Leave Room
          </Button>
        </Box>
        <Box sx={{display: "flex", alignItems: "center"}}>
          {showTimer ? (
            <Timer duration={3} onFinish={timerFinishHandler} />
          ): (
            <Button
              onClick={setTimerHandler}
              variant={"contained"}
              sx={{
                color: "white",
                border: "2px solid #FFFFFF88",
                backgroundColor: "#FFFFFF32",
                "&:hover": {
                  backgroundColor: "#FFFFFF50",
                },
              }}
            >
              Set Timer
            </Button>
          )}
        </Box>
      </Box>
    </Page>
  );
};

export default StudyingRoomPage;
