import { Box, Typography } from "@mui/material";
import { Image } from "mui-image";


const FriendCard = ({ profileImage, name }) => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      sx={{
        height: "100%",
        width: "100%",
        border: 0,
        overflow: "hidden"
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
          height={"100%"}
          fit={"scale-down"}
          src={profileImage}
          bgColor={""}
          duration={0}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Typography
          sx={{
            textAlign: "left",
            fontWeight: "medium",
            fontSize: "20px",
            color: "white",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {name}
        </Typography>
      </Box>
    </Box >
  );
};

export default FriendCard;
