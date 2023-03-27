import React from "react"
import {Box} from "@mui/material";
import LottiePlayer from "../components/LottiePlayer.jsx";
import backgroundAnimation from "../assets/homepage-background.json"

const HomePageSection = ({children, verticalCenter, horizontalCenter}) => {
  return (
    <Box sx={{minWidth: "100vw", minHeight: "100vh", display: "flex", overflowX: "hidden"}}>
      <LottiePlayer
        animationData={backgroundAnimation}
        sx={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: {
            xs: "none",
            md: "block"
          }
        }}
      />
      <Box
        sx={{
          background: "linear-gradient(to right, #3f086a, #2e0659, #3f086a)",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: {
            xs: "block",
            md: "none"
          }
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

export default HomePageSection
