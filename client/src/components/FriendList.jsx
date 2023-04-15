import { Box } from "@mui/material";
import FriendCard from "./FriendCard";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useContext } from "react";


const FriendList = ({ friends }) => {
    return (
        <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
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
