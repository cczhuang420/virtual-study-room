import { Button, Menu, MenuItem, styled } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useState } from "react";
import ProductFilterButton from "./ProductFilterButton.jsx";

const ProductMenuButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
    <>
      <ColorButton
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Products
      </ColorButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>
          <ProductFilterButton productName="Background" width="w-full" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ProductFilterButton productName="Profile Photo" width="w-full" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ProductFilterButton productName="Music" width="w-full" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProductMenuButton;
