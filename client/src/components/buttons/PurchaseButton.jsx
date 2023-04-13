import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BackgroundCard from "../../assets/background-card.svg";
import MoneyIcon from "../../assets/asset-money-icon.svg";
import { Box, styled } from "@mui/material";

const PurchaseButton = () => {
  const ColorButton = styled(Button)(() => ({
    backgroundColor: "#9B84B4",
    textTransform: "unset !important",
    fontSize: 14,
    fontFamily: "Rubik",
    "&:hover": {
      opacity: "0.9",
      backgroundColor: "#9B84B4",
      transform: "scale(1.05)",
    },
  }));

  return <ColorButton size="small">Purchase</ColorButton>;
};

export default PurchaseButton;
