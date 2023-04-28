import { Box, Button } from "@mui/material";
import FriendList from "../components/FriendList.jsx";
import Nino from "../assets/Nino.svg";
import Mike from "../assets/Mike.svg";
import Harry from "../assets/Harry.svg";
import Qingyang from "../assets/Qingyang.svg";
import CC from "../assets/CC.svg";
import Frank from "../assets/Frank.svg";
import {useAuth} from "../providers/AuthProvider.jsx";
import profilePlaceholder from "../assets/profiles/profile-placeholder.svg"
import {useFetch} from "../hooks/useFetch.js";

const FriendContainer = () => {
  const {getCustomUser} = useAuth()

  const {data, isLoading} = useFetch(`friends?id=${getCustomUser()._id}`)

  const friendList = isLoading ? [] : data.map(({username}) => ({name: username, image: profilePlaceholder}))

  console.log(friendList)

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      paddingTop={6}
      sx={{
        height: "100%",
        width: "100%",
        border: 0,
        overflow: "hidden",
        backgroundColor: "#290451",
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Button
          variant="contained"
          sx={{
            height: "100%",
            width: "80%",
            color: "#FFFFFF",
            backgroundColor: "#7012D3",
            textTransform: "none",
            textAlign: "center",
            fontWeight: "large",
            fontSize: "0.8em",
          }}
        >
          Search your friends
        </Button>
      </Box>
      <Box
        paddingTop={2}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"row"}
      >
        <FriendList
          friends={friendList}
        />
      </Box>
    </Box>
  );
};

export default FriendContainer;
