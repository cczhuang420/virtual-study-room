import { Box, Typography } from "@mui/material";
import { Image } from "mui-image";


const FriendCard = ({ profileImage, name }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      sx={{
        height: "10%",
        width: "10%",
        border: 0,
        overflow: "hidden",
      }}
    >
      <Image
        width={"30%"}
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

  );
};

export default FriendCard;
