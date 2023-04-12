import Page from "../containers/Page.jsx";
import React from "react"
import {Box, styled, Button} from "@mui/material";
import ProductCard from "../components/ProductCard.jsx"

const MarketplacePage = () => {
    const ColorButton = styled(Button)(() => ({
        backgroundColor: "#9B84B4",
        color: "black",
        textTransform: "unset !important",
        fontSize:20,
        fontFamily:"Rubik",
        '&:hover': {
            opacity:"0.9",
            backgroundColor: "#FFFFFF",
            transform:"scale(1.02)",

        },
        '&:focus':{
            backgroundColor: "#FFFFFF",
            color:"black",
        },
        borderRadius:30,
    }));

    return (
    <Page title={"Marketplace"}>
        <>
            <Box className="mb-10">
                <Box className="flex flex-row space-x-5 m-10 mb-0">
                    <ColorButton variant="contained" size="small" className="w-40">Background</ColorButton>
                    <ColorButton variant="contained" size="small" className="w-40">Profile Photo</ColorButton>
                </Box>

                <Box className="flex flex-row flex-wrap space-x-10 space-y-10"
                >
                    <div></div>
                    <ProductCard value="200"  productName="Notebook"/>
                    <ProductCard value="200"  productName="Notebook"/>
                    <ProductCard value="200"  productName="Notebook"/>
                    <ProductCard value="200"  productName="Notebook"/>
                    <ProductCard value="200"  productName="Notebook"/>
                    <ProductCard value="200"  productName="Notebook"/>
                </Box>
            </Box>

        </>s

    </Page>
  )
}

export default MarketplacePage
