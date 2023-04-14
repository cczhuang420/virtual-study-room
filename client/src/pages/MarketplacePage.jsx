import Page from "../containers/Page.jsx";
import React from "react";
import { Box } from "@mui/material";
import ProductFilterButton from "../components/buttons/products/ProductFilterButton.jsx";

const MarketplacePage = () => {
  return (
    <Page title={"Marketplace"}>
      <>
        <Box className="mb-10 w-full">
          <ProductFilterButton />
        </Box>
      </>
    </Page>
  );
};

export default MarketplacePage;
