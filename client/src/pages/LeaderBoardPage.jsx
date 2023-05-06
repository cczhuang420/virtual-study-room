import Page from "../containers/Page.jsx";
import React from "react";
import profileImage from "../assets/profiles/Mike.svg";
import { Box, Typography, Button, Divider, Grid } from "@mui/material";
import img1 from "../assets/backgrounds/backgroundRoom.svg";
import img2 from "../assets/backgrounds/background-card.svg";
import ListItem from "@mui/material/ListItem";
import FriendCard from "../components/FriendCard.jsx";
import TopLeaderCard from "../components/TopLeaderCard.jsx";
import RankBar from "../components/RankBar.jsx";
import BackgroundCard from "../components/BackgroundCard.jsx";
import {useFetch} from "../hooks/useFetch.js";

const LeaderboardPage = () => {

    const {data, isLoading} = useFetch("users");
    const dataModified = isLoading ? [] : data.sort((a,b) => (b.experience - a.experience));
    const dataArray = dataModified.map((item, index) => {
        return { ...item, ranking: index + 1, hours: Math.floor(item.experience/6), profile: `/src/assets/profiles/${item.profile}`};
    });

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
          {podiumArray.map(({ profile, username, ranking, hours }, index) => (
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
                profileImage={profile}
                name={username}
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
            assetValue={"COINS"}
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
                overflow: "hidden",
              //background: "rgba(255, 255, 255, .5)",
            }}
          >
            {rankingArray
              .slice(0, 5)
              .map(
                (
                  { ranking, profile, username, hours, experience, coins },
                  index
                ) => (
                  <Grid key={index} item xs={12}>
                    <RankBar
                      profileImage={profile}
                      name={username}
                      hours={hours}
                      assetValue={coins}
                      xpValue={experience}
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
