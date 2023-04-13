import React from "react";
import { styled, Button } from "@mui/material";

const ProductFilterButton = ({ productName, width, handleOnClick }) => {
  const ColorButton = styled(Button)(() => ({
    backgroundColor: "#9B84B4",
    color: "black",
    textTransform: "unset !important",
    fontFamily: "Rubik",
    "@media (min-width:500px)": {
      fontSize: "1rem",
    },

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
    <ColorButton
      variant="contained"
      size="small"
      className={width}
      onClick={handleOnClick}
    >
      <p> {productName}</p>
    </ColorButton>
  );
};

export default ProductFilterButton;
