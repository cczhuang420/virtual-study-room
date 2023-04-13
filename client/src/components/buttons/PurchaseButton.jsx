import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";

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
