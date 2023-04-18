import { Avatar, Box, Typography } from "@mui/material";
import MusicNote from "../assets/music-note.svg";
import musicBackground from "../assets/backgroundRoom.svg";

const ModalProductCard = ({ image, title, value }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      sx={{
        height: "100%",
        width: "100%",
        borderRadius: "13px",
        backgroundImage: `url(${
          value === 0 ? image : value === 1 ? musicBackground : musicBackground
        })`,
        backgroundSize: "cover",
      }}
    >
      <Box
        height={"50%"}
        width={"100%"}
        p={2}
        display={"flex"}
        justifyContent={"space-around"}
        alignItems={"center"}
        sx={{
          background: "rgba(255, 255, 255, .3)",
          backdropFilter: "blur(5px)",
        }}
      >
        {value === 1 ? (
          <img src={MusicNote} alt="Music Note" style={{ width: "50px" }} />
        ) : value === 2 ? (
          <Avatar src={image} />
        ) : null}
        <Box>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: "600",
              fontSize: "calc(130%)",
              textAlign: "center",
            }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ModalProductCard;
