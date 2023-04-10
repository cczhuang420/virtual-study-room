import { Box, Typography, Button } from "@mui/material";
import { Image } from "mui-image";
import { useState } from "react";

const RoomCard = ({ name, image, xpValue, onClick }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-around"}
      alignItems={"center"}
      sx={{
        height: "100%",
        width: "100%",
        borderRadius: "13px",
        background: "rgba(255, 255, 255, .8)",
        cursor: "pointer",
        boxShadow: "inset 0px 0px 15px 3px rgba(0,0,0,0.6)",
      }}
    >
      <Image
        width={"40%"}
        fit={"scale-down"}
        height={"100%"}
        src={image}
        bgColor={""}
        duration={0}
      />

      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          height: "95%",
          width: "70%",
          overflow: "hidden",
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          sx={{
            height: "50%",
            width: "100%",
            overflow: "visible",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            {name}
          </Typography>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"flex-end"}
          sx={{
            height: "30%",
            width: "100%",
            overflow: "visible",
          }}
        >
          <Typography
            sx={{
              height: "65%",
              overflow: "hidden",
              color: "#8E8E8E",
            }}
          >
            xp: {xpValue.toLocaleString()}
          </Typography>
          <Button
            onClick={onClick}
            size={"small"}
            disableElevation
            sx={{
              height: "60%",
              width: "20%",
              borderRadius: "30px",
              overflow: "hidden",
              mr: "0.9rem",
              background: "#9783B0",
            }}
          >
            CHAT
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RoomCard;
