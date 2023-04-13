import React from "react";
import { styled, Button } from "@mui/material";

const ProductFilterButton = ({ productName }) => {
  const ColorButton = styled(Button)(() => ({
    backgroundColor: "#9B84B4",
    color: "black",
    textTransform: "unset !important",
    fontSize: 20,
    fontFamily: "Rubik",
    "&:hover": {
      opacity: "0.9",
      backgroundColor: "#FFFFFF",
      transform: "scale(1.02)",
    },
    "&:focus": {
      backgroundColor: "#FFFFFF",
      color: "black",
    },
    borderRadius: 30,
  }));

  return (
    <ColorButton variant="contained" size="small" className="w-40">
      {productName}
    </ColorButton>
  );
};

export default ProductFilterButton;
