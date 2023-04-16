import React from "react"
import Page from "../containers/Page.jsx";
import {useParams} from "react-router-dom";
import roomBg from "../assets/study-room-bg.svg"
import {Box, Button, Grid} from "@mui/material"
import mikeProfile from "../assets/Mike.svg"
import RoomUserCard from "../components/RoomUserCard.jsx";
import logo from "../assets/logo.svg";

const roomUsers = Array(10).fill({
  name: "Mike Ma",
  image: mikeProfile,
  xpValue: Math.round(Math.random() * 10000),
  onClick: () => alert("This is Mike")
})

const StudyingRoomPage = () => {

  const {roomId} = useParams()

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
              sx={{
                flex: 1,
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                  width: '10px'
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "rgba(0,0,0,0)",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(0,0,0,0)",
                }
              }}
            >
              <Grid container sx={{p: 10, pt: 1}}>
                {roomUsers.map((roomUser) => (
                  <Grid item xs={12} md={6} sx={{p: 5, pt: 0}}>
                    <RoomUserCard {...roomUser} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
          <Box>2</Box>
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
