import { Box } from "@mui/material";
import BackgroundProductCard from "./BackgroundProductCard.jsx";
import ProfileProductCard from "./ProfileProductCard.jsx";
import MusicProductCard from "./MusicProductCard.jsx";
import React from "react";

const ProductContainer = ({ product }) => {
  return (
    <div>
      {product === "Background" ? (
        <Box className="flex flex-row flex-wrap space-x-10 space-y-10">
          <div></div>
          <BackgroundProductCard value="200" productName="Notebook" />
          <BackgroundProductCard value="200" productName="Notebook" />
          <BackgroundProductCard value="200" productName="Notebook" />
          <BackgroundProductCard value="200" productName="Notebook" />
          <BackgroundProductCard value="200" productName="Notebook" />
          <BackgroundProductCard value="200" productName="Notebook" />
        </Box>
      ) : product === "Profile Photo" ? (
        <Box className="flex flex-row flex-wrap space-x-10 space-y-10">
          <div></div>
          <ProfileProductCard value="200" productName="Profile Photo" />
        </Box>
      ) : (
        <Box className="flex flex-row flex-wrap space-x-10 space-y-10">
          <div></div>
          <MusicProductCard value="200" productName="Music" />
        </Box>
      )}
    </div>
  );
};

export default ProductContainer;
