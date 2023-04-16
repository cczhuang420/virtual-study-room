import {Box} from "@mui/material";
import RoomCard from "../RoomCard.jsx";
import StudyRoombackground from "../../assets/study-room-bg.svg";
import RoomCreater from "../RoomCreater.jsx";
import React from "react";


const PrivateRoomsContainer = () =>{
    // TODO: ADD this handler
    const handleOpenRoon = () => {
        alert("open");
    };
    return (
        <Box className="flex flex-row flex-wrap">
            <Box
                sx={{ minWidth: 400, minHeight: 280 }}
                className="w-1/3 m-10"
            >
                <RoomCard
                    title="Private Room 1"
                    showLockIcon={true}
                    showPeopleAmount={false}
                    image={StudyRoombackground}
                    showVagueBackground={true}
                    onClick={handleOpenRoon}
                />
            </Box>
            <div></div>
            <Box
                sx={{ minWidth: 400, minHeight: 280 }}
                className="w-1/3 m-10"
            >
                <RoomCard
                    title="Private Room 1"
                    showLockIcon={true}
                    showPeopleAmount={false}
                    image={StudyRoombackground}
                    showVagueBackground={true}
                    onClick={handleOpenRoon}
                />
            </Box>

            <Box
                sx={{ minWidth: 400, minHeight: 280 }}
                className="w-1/3 m-10"
            >
                <RoomCard
                    title="Private Room 1"
                    showLockIcon={true}
                    showPeopleAmount={false}
                    image={StudyRoombackground}
                    showVagueBackground={true}
                    onClick={handleOpenRoon}
                />
            </Box>

            <Box sx={{ minWidth: 400, minHeight: 280 }} className="w-1/3 m-10">
                <RoomCreater onClick={() => alert("add new room")} />
            </Box>
        </Box>
    )
}

export default PrivateRoomsContainer;