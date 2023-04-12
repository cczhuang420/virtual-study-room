import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BackgroundCard from "../assets/background-card.svg";
import MoneyIcon from "../assets/asset-money-icon.svg";
import {Box, styled} from "@mui/material";

const ProductCard = ({value, productName}) => {

    const ColorButton = styled(Button)(() => ({
        backgroundColor: "#9B84B4",
        textTransform: "unset !important",
        fontSize:14,
        fontFamily:"Rubik",
        '&:hover': {
            opacity:"0.9",
            backgroundColor: "#9B84B4",
            transform:"scale(1.05)",

        },
    }));

    return (
        <Card className="w-96" sx={{ maxWidth: 350, borderRadius: 3}}>
            <CardMedia
                sx={{ height: 200 }}
                image={BackgroundCard}
                title="Product Card"
            />
            <Box className="mx-2 mb-2">
                <CardContent className="-mb-4 -mt-1">
                    <Typography gutterBottom variant="h4" component="div">
                        {productName}
                    </Typography>
                </CardContent>
                <CardActions className="flex flex-row justify-between">
                    <Box className="flex flex-row justify-between space-x-1">
                        <img src={MoneyIcon} alt={"Dollor Icon"}  className="w-5 h-5"/>
                        <Typography gutterBottom variant="h5" component="div">
                            {value}
                        </Typography>
                    </Box>
                    <ColorButton size="small">View Details</ColorButton>
                </CardActions>
            </Box>

        </Card>
    );
}

export default ProductCard;