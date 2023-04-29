import { Box, Typography } from "@mui/material";

const FriendCard = ({ profileImage, name, onClick }) => {
  return (
    <Box
      onClick={onClick}
      display={"flex"}
      alignItems={"center"}
      sx={{
        p: 1,
        width: "100%",
        border: 0,
        overflow: "hidden",
        cursor: "pointer",
        borderRadius: "10px",
        "&:hover": {
          backgroundColor: onClick ? "rgba(255,255,255,.3)" : "transparent"
        }
      }}
    >
      <Box
        sx={{
          mr: 1,
          overflow: "hidden",
        }}
      >
        <img src={profileImage} />
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
