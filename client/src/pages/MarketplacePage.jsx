import Page from "../containers/Page.jsx";
import React from "react";
import { Box, styled, Button } from "@mui/material";
import BackgroundProductCard from "../components/productCards/BackgroundProductCard.jsx";
import ProductFilterButton from "../components/buttons/ProductFilterButton.jsx";

const MarketplacePage = () => {
  return (
    <Page title={"Marketplace"}>
      <>
        <Box className="mb-10">
          <Box className="flex flex-row space-x-5 m-10 mb-0">
            <ProductFilterButton productName="Background" />
            <ProductFilterButton productName="Profile Photo" />
            <ProductFilterButton productName="Music" />
          </Box>

          <Box className="flex flex-row flex-wrap space-x-10 space-y-10">
            <div></div>
            <BackgroundProductCard value="200" productName="Notebook" />
            <BackgroundProductCard value="200" productName="Notebook" />
            <BackgroundProductCard value="200" productName="Notebook" />
            <BackgroundProductCard value="200" productName="Notebook" />
            <BackgroundProductCard value="200" productName="Notebook" />
            <BackgroundProductCard value="200" productName="Notebook" />
          </Box>
        </Box>
      </>
      s
    </Page>
  );
};

export default MarketplacePage;

// <ColorButton variant="contained" size="small" className="w-40">
//   Background
// </ColorButton>
// <ColorButton variant="contained" size="small" className="w-40">
//   Profile Photo
// </ColorButton>
// <ColorButton variant="contained" size="small" className="w-40">
//   Music
// </ColorButton>
