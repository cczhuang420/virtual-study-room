import { Box, Typography, Button } from "@mui/material";
import { Image } from "mui-image";
import { styled } from "@mui/material/styles";
import { useState } from "react";

{
  /* best height and width:
            width: "28%",
            height: "26%",
     */
}

const TopLeaderCard = ({
  profileImage,
  name,
  rankingImage,
  hours,
  onClick,
}) => {
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
        src={rankingImage}
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
          background: "rgba(255, 255, 255, .5)",
          boxShadow: "3px 3px 2px 1px rgba(255,255,255,0.2)",
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-around"}
          alignItems={"center"}
          sx={{
            height: "100%",
            width: "100%",
          }}
        >
          <Image
            width={"20%"}
            fit={"scale-down"}
            height={"40%"}
            src={profileImage}
            bgColor={""}
            duration={0}
            sx={{ background: "rgba(255, 255, 255, .5)" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TopLeaderCard;
