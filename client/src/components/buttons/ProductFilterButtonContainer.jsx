import ProductFilterButton from "./ProductFilterButton.jsx";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const ProductFilterButtonContainer = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnClick = () => {
    alert("open");
  };

  return (
    <>
      {windowWidth < 853 ? (
        <div className="m-10 mb-0">
          <Button
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Products
          </Button>
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
              <ProductFilterButton
                productName="Background"
                width="w-full"
                handleOnClick={handleOnClick}
              />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ProductFilterButton
                productName="Profile Photo"
                width="w-full"
                handleOnClick={handleOnClick}
              />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ProductFilterButton
                productName="Music"
                width="w-full"
                handleOnClick={handleOnClick}
              />
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <Box className="flex flex-row space-x-5 m-10 mb-0 w-1/2 max-w-lg min-w-fit">
          <ProductFilterButton
            productName="Background"
            width="w-1/3"
            handleOnClick={handleOnClick}
          />
          <ProductFilterButton
            productName="Profile Photo"
            width="w-1/3"
            handleOnClick={handleOnClick}
          />
          <ProductFilterButton
            productName="Music"
            width="w-1/3"
            handleOnClick={handleOnClick}
          />
        </Box>
      )}
    </>
  );
};

export default ProductFilterButtonContainer;
