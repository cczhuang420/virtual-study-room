import React from "react"
import {Box} from "@mui/material";
import LottiePlayer from "../components/LottiePlayer.jsx";
import backgroundAnimation from "../assets/homepage-background.json"

const HomePage = ({children, verticalCenter, horizontalCenter}) => {
  return (
    <Box sx={{minWidth: "100vw", minHeight: "100vh", display: "flex"}}>
      <LottiePlayer
        animationData={backgroundAnimation}
        sx={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: verticalCenter ? "center" : "flex-start",
          alignItems: horizontalCenter ? "center" : "flex-start",
          flex: 1
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default HomePage
