import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MoneyIcon from "../../assets/asset-money-icon.svg";
import MusicNote from "../..//assets/music-note.svg";
import { Box } from "@mui/material";
import PurchaseButton from "../buttons/products/PurchaseButton.jsx";

const MusicProductCard = ({ value, productName, artist }) => {
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
          <PurchaseButton />
        </CardActions>
      </Box>
    </Card>
  );
};

export default MusicProductCard;
