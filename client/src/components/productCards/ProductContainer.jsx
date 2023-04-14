import { Box } from "@mui/material";
import BackgroundProductCard from "./BackgroundProductCard.jsx";
import ProfileProductCard from "./ProfileProductCard.jsx";
import MusicProductCard from "./MusicProductCard.jsx";
import React from "react";

// TODO: add real product later
const ProductContainer = ({ value }) => {
  return (
    <div>
      {value === 0 ? (
        <Box className="flex flex-row flex-wrap space-x-10 space-y-10">
          <div></div>
          <BackgroundProductCard value="200" productName="Notebook" />
          <BackgroundProductCard value="200" productName="Notebook" />
          <BackgroundProductCard value="200" productName="Notebook" />
          <BackgroundProductCard value="200" productName="Notebook" />
          <BackgroundProductCard value="200" productName="Notebook" />
          <BackgroundProductCard value="200" productName="Notebook" />
        </Box>
      ) : value === 1 ? (
        <Box className="flex flex-row flex-wrap space-x-10 space-y-10">
          <div></div>
          <ProfileProductCard value="200" productName="Profile Photo" />
          <ProfileProductCard value="200" productName="Profile Photo" />
          <ProfileProductCard value="200" productName="Profile Photo" />
          <ProfileProductCard value="200" productName="Profile Photo" />
          <ProfileProductCard value="200" productName="Profile Photo" />
          <ProfileProductCard value="200" productName="Profile Photo" />
        </Box>
      ) : value === 2 ? (
        <Box className="flex flex-row flex-wrap space-x-10 space-y-10">
          <div></div>
          <MusicProductCard
            value="200"
            productName="Happy Birthday"
            artist="Frank jI"
          />
          <MusicProductCard
            value="200"
            productName="世上只有妈妈好"
            artist="Frank jI"
          />
          <MusicProductCard
            value="200"
            productName="Baa Baa Black Sheep"
            artist="Frank jI"
          />
          <MusicProductCard
            value="200"
            productName="哆啦a梦"
            artist="Frank jI"
          />
        </Box>
      ) : (
        <> </>
      )}
    </div>
  );
};

export default ProductContainer;
