import { Box } from "@mui/material";
import FriendCard from "./FriendCard";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {useNavigate} from "react-router-dom";

const FriendList = ({ friends, onClick, onAddFriend }) => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        border: 0,
        // overflow: "hidden"
      }}
    >
      <List>
        {friends.map(({ image, name, id }, index) => (
          <ListItem key={index} sx={{p: 1}}>
            <FriendCard
              id={id}
              profileImage={image}
              name={name}
              onClick={onClick && (() => onClick(id))}
              onAddFriend={onAddFriend && (() => onAddFriend(id))}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FriendList;
