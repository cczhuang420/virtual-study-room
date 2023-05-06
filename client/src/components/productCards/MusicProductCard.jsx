import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MoneyIcon from "../../assets/asset-money-icon.svg";
import MusicNote from "../..//assets/music-note.svg";
import { Box, IconButton } from "@mui/material";
import PurchaseButton from "../buttons/products/PurchaseButton.jsx";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { useState } from "react";
import { useMusic } from "../../providers/MusicProvider.jsx";

const playButtonStyle = {
  backgroundColor: "#9B84B4",
  textTransform: "unset !important",
  height: "35px",
  width: "35px",
  borderRadius: "50000px",
  fontSize: 14,
  fontFamily: "Rubik",
  "&:hover": {
    opacity: "0.9",
    backgroundColor: "#9B84B4",
    transform: "scale(1.05)",
  },
};

const MusicProductCard = ({
  value,
  productName,
  artist,
  productId,
  musicUrl,
}) => {
  const { playMusic, pauseMusic } = useMusic();

  const [isPlay, setIsPlay] = useState(false);

  const handlePlay = () => {
    if (isPlay) {
      // get music id from youtube url
      const musicId = musicUrl.split("v=")[1];
      const ampersandPosition = musicId.indexOf("&");
      if (ampersandPosition !== -1) {
        musicId = musicId.substring(0, ampersandPosition);
      }

      pauseMusic();

      // start a timer to play music for only 15 seconds
      setTimeout(() => {
        pauseMusic();
      }, 15000);

      playMusic(musicId, 0);
    } else {
      pauseMusic();
    }
    setIsPlay((pre) => !pre);
  };

  return (
    <Card className="w-96" sx={{ maxWidth: 350, borderRadius: 3 }}>
      <Box className="mx-2 mb-2">
        <CardContent className="flex fle-row justify-between -mb-4 -mt-1">
          <div className="flex fle-row space-x-2 text-center">
            <img
              className="w-10 h-10 mb-2"
              src={MusicNote}
              alt="Music note icon"
            />
            <Typography gutterBottom variant="h5" component="div">
              {productName}
            </Typography>
          </div>

          <Typography gutterBottom variant="h6" component="div">
            {`By ${artist}`}
          </Typography>
        </CardContent>
        <CardActions className="flex flex-row justify-between">
          <Box className="flex flex-row justify-between space-x-1">
            <img src={MoneyIcon} alt={"Dollar Icon"} className="w-5 h-5" />
            <Typography gutterBottom variant="h5" component="div">
              {value}
            </Typography>
          </Box>
          <IconButton sx={playButtonStyle} onClick={handlePlay}>
            {!isPlay ? <PlayArrowIcon /> : <StopIcon />}
          </IconButton>
          <PurchaseButton
            type={1}
            title={productName}
            cost={value}
            productId={productId}
          />
        </CardActions>
      </Box>
    </Card>
  );
};

export default MusicProductCard;
