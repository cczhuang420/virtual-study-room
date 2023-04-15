import { Box, Button } from "@mui/material";
import { Image } from "mui-image";
import FriendList from "../components/FriendList.jsx";
import Nino from "../assets/Nino.svg";
import Mike from "../assets/Mike.svg";
import Harry from "../assets/Harry.svg";
import Qingyang from "../assets/Qingyang.svg";
import CC from "../assets/CC.svg";
import Frank from "../assets/Frank.svg";


const FriendContainer = () => {
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            paddingTop={6}
            sx={{
                height: "100%",
                width: "20%",
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
                        height: '100%',
                        width: '80%',
                        color: '#FFFFFF',
                        backgroundColor: '#7012D3',
                        textTransform: 'none',
                        textAlign: 'center',
                        fontWeight: "large",
                        fontSize: "0.8em",
                    }}
                >Search your friends
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
                    friends={[
                        { image: Frank, name: "Frank Ji" },
                        { image: Mike, name: "马思琦" },
                        { image: CC, name: "庄笑笑" },
                        { image: Qingyang, name: "李青洋" },
                        { image: Harry, name: "Harry Qu" },
                        { image: Nino, name: "Yinuo Xue" },
                    ]}
                />
            </Box>
        </Box>
    );
};

export default FriendContainer;
