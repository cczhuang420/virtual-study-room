import Page from "../containers/Page.jsx";
import React from "react"
import {Box} from "@mui/material";
import profileImage from "../assets/profile-image.svg";
import RankBar from "../components/RankBar.jsx";

const LeaderboardPage = () => {
  return (
    <Page title={"Leaderboard"}>
      <Box sx={{color: "white"}}>
        Leaderboard Page
      </Box>
      <RankBar rankValue={"01"} profileImage={profileImage} name={"Mike Ma"} xpValue={"10,303"} assetValue={"3,600"} hours={"9999+"} />
    </Page>
  )
}

export default LeaderboardPage
