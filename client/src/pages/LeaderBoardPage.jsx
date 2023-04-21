import Page from "../containers/Page.jsx";
import React from "react";
import profileImage from "../assets/Mike.svg";
import { Box, Typography, Button, Divider, Grid } from "@mui/material";
import img1 from "../assets/backgroundRoom.svg";
import img2 from "../assets/background-card.svg";
import ListItem from "@mui/material/ListItem";
import FriendCard from "../components/FriendCard.jsx";
import TopLeaderCard from "../components/TopLeaderCard.jsx";
import RankBar from "../components/RankBar.jsx";
import BackgroundCard from "../components/BackgroundCard.jsx";

const LeaderboardPage = () => {
  //fake data, will be replaced by the data which fetch from the backend-------------------
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
  //fake data end -------------------------------------------------------------------------

  const podiumArray = dataArray.slice(0, 3);
  const rankingArray = dataArray.slice(3);

  const heightPercent = ["10%", "30%", "5%", "8%", "47%"];
  return (
    <Page title={"Leaderboard"}>
      <Box
        margin={3}
        marginLeft={6}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"flex-start"}
        sx={{
          width: "100%",
          height: "100%",
          //background: "rgba(255, 255, 255, .5)",
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          sx={{
            width: "100%",
            height: heightPercent[0],
            //background: "rgba(255, 255, 255, .5)",
          }}
        >
          <Typography
            marginLeft={4}
            sx={{
              textAlign: "flex-start",
              fontSize: "2.5rem",
              color: "white",
              flexGrow: "0.6",
            }}
          >
            Top Learners
          </Typography>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-around"}
          alignItems={"space-between"}
          sx={{
            width: "100%",
            height: heightPercent[1],
            //background: "rgba(255, 255, 255, .5)",
          }}
        >
          {podiumArray.map(({ profileImage, name, ranking, hours }, index) => (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-around"}
              sx={{
                width: "100%",
                height: "100%",
                //background: "rgba(255, 255, 255, .5)",
              }}
              key={index}
            >
              <TopLeaderCard
                profileImage={profileImage}
                name={name}
                ranking={ranking}
                hours={hours}
              />
            </Box>
          ))}
        </Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          sx={{
            width: "100%",
            height: heightPercent[2],
            //background: "rgba(255, 255, 255, .9)",
          }}
        >
          <Typography
            marginLeft={2}
            sx={{
              textAlign: "flex-start",
              fontSize: "1.3rem",
              color: "white",
              flexGrow: "0.6",
            }}
          >
            All Users
          </Typography>
        </Box>
        <Box
          display={"flex"}
          marginLeft={1.7}
          paddingBottom={1}
          flexDirection={"row"}
          sx={{
            width: "92%",
            height: heightPercent[3],
            //background: "rgba(255, 255, 255, .5)",
          }}
        >
          <RankBar
            profileImage={""}
            rankValue={"RANK"}
            name={"NAME"}
            xpValue={"XP"}
            assetValue={"ASSET"}
            hours={"HOURS"}
          />
        </Box>
        <Box
          marginLeft={1.7}
          sx={{ width: "92%", height: heightPercent[4], overflowY: "auto" }}
        >
          <Grid
            container
            //direction="row"
            //justifyContent="flex-start"
            //alignItems="center"
            rowSpacing={1}
            sx={{
              width: "100%",
              height: "100%",
              margin: 0,
              //background: "rgba(255, 255, 255, .5)",
            }}
          >
            {rankingArray
              .slice(0, 5)
              .map(
                (
                  { ranking, profileImage, name, hours, xpValue, assetValue },
                  index
                ) => (
                  <Grid key={index} item xs={12}>
                    <RankBar
                      profileImage={profileImage}
                      name={name}
                      hours={hours}
                      assetValue={assetValue}
                      xpValue={xpValue}
                      rankValue={ranking}
                    />
                  </Grid>
                )
              )}
          </Grid>
        </Box>
      </Box>
    </Page>
  );
};

export default LeaderboardPage;
