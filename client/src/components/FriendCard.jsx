import { Box, Typography } from "@mui/material";
import { Image } from "mui-image";


const FriendCard = ({ profileImage, name }) => {
  return (
    <Box
      paddingLeft={3}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        height: "100%",
        width: "100%",
        border: 0,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "35%",
          overflow: "hidden",
        }}
      >
        <Image
          width={"100%"}
          height={"100%"}
          fit={"scale-down"}
          src={profileImage}
          bgColor={""}
          duration={0}
        />
      </Box>
      <Box
        paddingLeft={2}
        sx={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Typography
          sx={{
            textAlign: "left",
            fontWeight: "medium",
            fontSize: "1em",
            color: "white",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {name.toLocaleString()}
        </Typography>
      </Box>
    </Box >
  );
};

export default FriendCard;
