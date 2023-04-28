import { Box } from "@mui/material";
import FriendCard from "./FriendCard";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {useNavigate} from "react-router-dom";

const FriendList = ({ friends }) => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        border: 0,
        overflow: "hidden"
      }}
    >
      <List>
        {friends.map(({ image, name, id }, index) => (
          <ListItem key={index} sx={{p: 1}}>
            <FriendCard
              profileImage={image}
              name={name}
              onClick={() => navigate(`/friends/${id}`)}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FriendList;
