import ProductFilterButton from "./ProductFilterButton.jsx";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ProductMenuButton from "./ProductMenuButton.jsx";

const ProductFilterButtonContainer = () => {
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

  const handleOnClick = () => {
    alert("open");
  };

  return (
    <>
      {windowWidth < 853 ? (
        <div className="m-10 mb-0">
          <ProductMenuButton />
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
