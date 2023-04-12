import { Box, Typography } from "@mui/material";
import { Image } from "mui-image";


const RankBar = ({ rankValue, profileImage, name, xpValue, assetValue, hours }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-around"}
      alignItems={"center"}
      sx={{
        height: "10%",
        width: "100%",
        borderRadius: "10px",
        background: "rgba(255, 255, 255, .5)",
        overflow: "hidden",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: "medium",
          fontSize: "1em",
          color: "white",
          mr: "0.5rem",
          overflow: "hidden",
        }}
      >
        {rankValue.toLocaleString()}
      </Typography>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <Image
          width={"23%"}
          height={"100%"}
          fit={"scale-down"}
          src={profileImage}
          bgColor={""}
          duration={0}
        />
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: "medium",
            fontSize: "1em",
            color: "white",
            mr: "0.5rem",
            overflow: "hidden",
          }}
        >
          {name.toLocaleString()}
        </Typography>
      </Box>
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: "medium",
          fontSize: "1em",
          color: "white",
          mr: "0.5rem",
          overflow: "hidden",
        }}
      >
        {xpValue.toLocaleString()}
      </Typography>
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: "medium",
          fontSize: "1em",
          color: "white",
          mr: "0.5rem",
          overflow: "hidden",
        }}
      >
        {assetValue.toLocaleString()}
      </Typography>
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: "medium",
          fontSize: "1em",
          color: "white",
          mr: "0.5rem",
          overflow: "hidden",
        }}
      >
        {hours.toLocaleString()}
      </Typography>
    </Box>
  );
};

export default RankBar;
