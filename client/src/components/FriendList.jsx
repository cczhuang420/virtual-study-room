import { Box, Typography } from "@mui/material";
import { Image } from "mui-image";
import FriendCard from "./FriendCard";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import profileImage from "../assets/profile-image.svg";
import tempProfileImage from "../assets/temp-profile-image.svg";
import { useContext } from "react";


const FriendList = ({ friends }) => {
    return (
        <Box
            paddingTop={2}
            display={"flex"}
            sx={{
                height: "100%",
                width: "100%",
                border: 0,
                overflow: "hidden",
            }}
        >
            <List>
                {friends.map(({ image, name }) => (
                    <ListItem>
                        <FriendCard profileImage={image} name={name} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default FriendList;
