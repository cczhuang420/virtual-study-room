import React, { useCallback, useEffect, useState, useMemo } from "react";
import Page from "../containers/Page.jsx";
import { useParams } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import RoomUserCard from "../components/RoomUserCard.jsx";
import logo from "../assets/logo.svg";
import TodoList from "../components/TodoList";
import ChatModal from "../components/ChatModal.jsx";
import { useAuth } from "../providers/AuthProvider.jsx";
import { useSocket } from "../providers/SocketProvider.jsx";
import { useFetch } from "../hooks/useFetch.js";
import { useMutation } from "../hooks/useMutation.js";
import { HTTP_METHOD } from "../hooks/http-methods.js";
import Timer from "../components/Timer.jsx";
import { useNotification } from "../providers/NotificationProvider.jsx";
import { useMusic } from "../providers/MusicProvider.jsx";

const sortByOptions = ["name", "experience"];

const StudyingRoomPage = () => {
  // array of {senderId, profileImageUrl, content}
  const [chatHistory, setChatHistory] = useState([]);
  const [roomUsers, setRoomUsers] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [showTimer, setShowTimer] = useState(false);
  const [targetUser, setTargetUser] = useState({
    username: "All Users",
  });

  const { roomId } = useParams();
  const socket = useSocket();
  const { getCustomUser, reFetchUserData } = useAuth();
  const notify = useNotification();
  const { pauseMusic } = useMusic();

  const { data: roomData } = useFetch(`publicRooms/${roomId}`);
  const fetchUserHandler = useMutation("users", HTTP_METHOD.GET);
  const addExperienceHandler = useMutation(
    "users/experience/add",
    HTTP_METHOD.PATCH
  );

  const sortedRoomUsers = useMemo(() => {
    const users = roomUsers.map((u) => ({ ...u }));
    users.sort((a, b) => {
      if (a[sortBy] > b[sortBy]) return 1;
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] === b[sortBy]) return 0;
    });
    return users;
  }, [sortBy, roomUsers]);

  const leaveRoomHandler = useCallback(() => {
    history.back();
  }, []);

  const setTimerHandler = useCallback(() => {
    setShowTimer(true);
  }, []);

  const timerFinishHandler = useCallback(async () => {
    notify("Timer finished, reward earned");
    await addExperienceHandler.run({
      query: {
        userId: getCustomUser()._id,
      },
    });
    await reFetchUserData();
    setShowTimer(false);
  }, []);

  const changeSortingHandler = useCallback(() => {
    const index = sortByOptions.findIndex((o) => o === sortBy);
    const newValue = sortByOptions[(index + 1) % sortByOptions.length];
    setSortBy(newValue);
  }, [sortBy, setSortBy]);

  const newMessageSocketHandler = useCallback((data) => {
    // console.log(data)
    if (
      data.username !== "All Users" &&
      data.senderId !== targetUser._id &&
      data.senderId !== getCustomUser()._id
    ) {
      // notify(`${data.username} sends you a message`)
      console.log(targetUser, data)
      setRoomUsers(prevState => {
        const newState = JSON.parse(JSON.stringify(prevState))
        newState.find(u => u.username === data.username).hasUnread = targetUser.username !== data.username
        return newState
      })
    }
    setChatHistory((prevState) => [
      ...prevState,
      {
        ...data,
        content: data.message,
      },
    ]);
  }, [targetUser, setRoomUsers, setChatHistory])

  useEffect(() => {
    if (!socket) return;
    socket.emit("join-room", roomId);
    socket.emit("get-song-for-room", roomId);

    socket.listeners("room-member-emails").length !== 0 || socket.on('room-member-emails', async (emails) => {
      // console.log("room members: ", emails)
      const roomMembers =
        (
          await Promise.all(
            emails.map((email) => fetchUserHandler.run({
              query: { email }
            }))
          )
        )
          .map((res) => res[0])
          .map((user) => ({
            ...user,
            profile: `/src/assets/profiles/${user.profile}`,
            hasUnread: false
          }))
      setRoomUsers(roomMembers)
    })

    socket.removeAllListeners("new-message")
    socket.on("new-message", newMessageSocketHandler);

    return () => {
      socket.emit("leave-room", roomId);
      socket.off("message-in-rooms");

      pauseMusic();
    };
  }, [socket, newMessageSocketHandler]);


  const handleSendGroupChat = (message) => {
    socket.emit("send-group-message-in-room", {
      roomId: roomId,
      senderId: getCustomUser()._id,
      receiverEmail: "All Users",
      profileImageUrl: getCustomUser().profile,
      message: message,
      timestamp: Date.now(),
      username: "All Users"
    });
  };
  const handleSendPrivateChat = (message) => {
    socket.emit("send-private-message-in-room", {
      roomId: roomId,
      senderId: getCustomUser()._id,
      receiverEmail: targetUser.email,
      profileImageUrl: getCustomUser().profile,
      message: message,
      timestamp: Date.now(),
      username: getCustomUser().username
    });
  };

  const chatHandler = useCallback(
    targetUser.username === "All Users" ? handleSendGroupChat : handleSendPrivateChat,
    [targetUser, targetUser.username]
  )

  const handleChangeTargetUser = useCallback(
    (user) => {
      setTargetUser(user);
      setRoomUsers(prevState => {
        const newState = JSON.parse(JSON.stringify(prevState))
        newState.find(u => u.username === user.username).hasUnread = false
        return newState
      })
    },
    [setTargetUser]
  );

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
          background:
            roomData &&
            `url(/src/assets/backgrounds/${roomData.backgroundUrl}) no-repeat center`,
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
                position: "relative",
                zIndex: 100,
              }}
            >
              <Grid container sx={{ p: 10, pt: 1 }}>
                {sortedRoomUsers.map((roomUser) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{ p: 5, pt: 0 }}
                    key={roomUser.email}
                  >
                    <RoomUserCard
                      {...roomUser}
                      onChat={() => setTargetUser(roomUser)}
                    />
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
                userList={roomUsers.filter(({username}) => username !== getCustomUser().username)}
                onSend={chatHandler}
                onChangeTargetUser={(user) => handleChangeTargetUser(user)}
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {showTimer ? (
            <Timer duration={3} onFinish={timerFinishHandler} />
          ) : (
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
