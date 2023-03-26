import React from "react"
import {Box} from "@mui/material";
import LottiePlayer from "../components/LottiePlayer.jsx";
import backgroundAnimation from "../assets/homepage-background.json"

const HomePage = ({children}) => {
  return (
    <Box sx={{width: "100vw", height: "100vh"}}>
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
      {children}
    </Box>
  )
}

export default HomePage
