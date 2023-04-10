import { Box, Typography, Button, Divider } from "@mui/material";
import { Image } from "mui-image";
import goldMedal from "../assets/podium-gold-medal.svg";
import silverMedal from "../assets/podium-silver-medal.svg";
import bronzeMedal from "../assets/podium-bronze-medal.svg";
import { useState } from "react";

{
  /* best height and width:
            width: "28%",
            height: "26%",
     */
}

function selectRankingMedal(ranking) {
  if (ranking === 1) {
    return goldMedal;
  } else if (ranking === 2) {
    return silverMedal;
  } else if (ranking === 3) {
    return bronzeMedal;
  } else {
    return undefined;
  }
}

const TopLeaderCard = ({ profileImage, name, ranking, hours, onClick }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      sx={{
        height: "95%",
        width: "95%",
        overflow: "visible",
        position: "relative",
      }}
    >
      <img
        src={selectRankingMedal(ranking)}
        alt="Ranking Medals"
        style={{
          position: "absolute",
          top: "-2%",
          right: "15%",
          width: "17%",
          zIndex: 1,
        }}
      />
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-around"}
        alignItems={"center"}
        sx={{
          height: "80%",
          width: "80%",
          borderRadius: "13px",
          overflow: "visible",
          background: "rgba(255, 255, 255, .5)",
          boxShadow: "3px 3px 2px 1px rgba(255,255,255,0.2)",
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          sx={{
            height: "55%",
            width: "100%",
            overflow: "visible",
          }}
        >
          <Image
            width={"20%"}
            fit={"scale-down"}
            height={"100%"}
            src={profileImage}
            bgColor={""}
            duration={0}
          />
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "2rem",
              color: "white",
              flexGrow: "0.6",
            }}
          >
            {name}
          </Typography>
        </Box>
        <Divider
          sx={{
            height: "3px",
            backgroundColor: "white",
            width: "80%",
            borderRadius: "4px",
          }}
        />
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-around"}
          alignItems={"center"}
          sx={{
            height: "15%",
            width: "100%",
            overflow: "visible",
          }}
        >
          <Typography
            sx={{
              overflow: "hidden",
              color: "white",
            }}
          >
            {hours.toLocaleString()} hours
          </Typography>
          <Typography
            onClick={onClick}
            sx={{
              overflow: "hidden",
              color: "white",
              "&:hover": {
                cursor: "pointer",
                transform: "scale(1.05)",
              },
            }}
          >
            {"View Profile >"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TopLeaderCard;
