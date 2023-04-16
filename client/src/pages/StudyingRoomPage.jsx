import React from "react"
import Page from "../containers/Page.jsx";
import {useParams} from "react-router-dom";
import roomBg from "../assets/study-room-bg.svg"
import {Box, Button, createTheme} from "@mui/material"
import {ThemeProvider} from "@mui/system";

const StudyingRoomPage = () => {

  const {roomId} = useParams()

  return (
    <Page
      title={`Virtual Study Room | Room ${roomId}`}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          background: `url(${roomBg}) no-repeat`,
          backgroundSize: "cover"
        }}
      >

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
