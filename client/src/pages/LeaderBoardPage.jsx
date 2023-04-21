import Page from "../containers/Page.jsx";
import React from "react";
import profileImage from "../assets/Mike.svg";
import { Box, Typography, Button, Divider } from "@mui/material";
import img1 from "../assets/backgroundRoom.svg";
import img2 from "../assets/background-card.svg";
import ListItem from "@mui/material/ListItem";
import FriendCard from "../components/FriendCard.jsx";
import TopLeaderCard from "../components/TopLeaderCard.jsx";

const LeaderboardPage = () => {
  //fake data, will be replaced by the data which fetch from the backend
  const initialData = {
    ranking: 1,
    profileImage: profileImage,
    name: "Mike Ma",
    hours: 100000,
    xpValue: 10303,
    assetValue: 3600,
  };
  const dataArray = [];
  for (let i = 0; i < 10; i++) {
    const newData = { ...initialData, ranking: initialData.ranking + i };
    dataArray.push(newData);
  }

  const podiumArray = dataArray.slice(0, 3);
  const rankingArray = dataArray.slice(3);

  return (
    <Page title={"Leaderboard"}>
      <Box
        padding={2}
        margin={5}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"flex-start"}
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Typography
          marginLeft={3}
          sx={{
            textAlign: "flex-start",
            fontSize: "3rem",
            color: "white",
            flexGrow: "0.6",
          }}
        >
          Top Learners
        </Typography>
        <Box
          padding={2}
          margin={5}
          display={"flex"}
          flexDirection={"row"}
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          {podiumArray.map(({ profileImage, name, ranking, hours }, index) => (
            <ListItem key={index}>
              <TopLeaderCard
                profileImage={profileImage}
                name={name}
                ranking={ranking}
                hours={hours}
              />
            </ListItem>
          ))}
        </Box>
      </Box>
    </Page>
  );
};

export default LeaderboardPage;
