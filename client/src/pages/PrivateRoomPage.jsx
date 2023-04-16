import Page from "../containers/Page.jsx";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useModal } from "../App.jsx";
import backgroundImage from "../assets/backgroundRoom.svg";
import StudyRoombackground from "../assets/study-room-bg.svg";
import AssetXPIcon from "../assets/asset-xp-icon.svg";
import AssetMoneyIcon from "../assets/asset-money-icon.svg";
import FriendContainer from "../components/FriendContainer.jsx";
import RoomCard from "../components/RoomCard.jsx";
import AssetLabel from "../components/AssetLabel.jsx";
import RoomCreater from "../components/RoomCreater.jsx";

const PrivateRoomPage = () => {
  // const [havePrivateRooms, setHavePrivateRooms] = useState(false);

  const [havePrivateRooms, setHavePrivateRooms] = useState(true);

  // TODO: ADD this handler
  const handleOpenRoon = () => {
    alert("open");
  };

  // TODO: This modal needed to be removed later right?
  // const { handleOpen, setContent } = useModal();
  //
  // useEffect(() => {
  //   setContent({
  //     title: "Check out",
  //     imageTitle: "Unlock private room now",
  //     image: backgroundImage,
  //     cost: 400,
  //     money: 1289,
  //     isRoomCard: true,
  //     onClick: () => {
  //       console.log("hahahaha");
  //     },
  //   });
  //   handleOpen();
  // }, []);

  return (
      <Page title={"Private Room"}>
        <Box className="flex flex-1 flex-row flex-auto justify-start h-full w-full">
          <Box
              sx={{
                minWidth: 180,
                maxWidth: 250,
              }}
              className="w-1/2 h-full"
          >
            <FriendContainer />
          </Box>

          <Box className="flex flex-col m-10 ml-20 mr-20 w-full space-y-10">
            <Box
                className="w-96 h-8 flex flex-row justify-end space-x-6 ml-auto"
                sx={{ minWidth: 300 }}
            >
              <AssetLabel image={AssetXPIcon} value={13000} />
              <AssetLabel image={AssetMoneyIcon} value={12000} />
            </Box>

            {havePrivateRooms ? (
                <Box className="flex flex-row flex-wrap">
                  <Box
                      sx={{ minWidth: 400, minHeight: 280 }}
                      className="w-1/3 mr-10 mb-10"
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
                      className="w-1/3 mr-10 mb-10"
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
                      className="w-1/3 mr-10 mb-10"
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

                  <Box sx={{ minWidth: 400, minHeight: 280 }} className="w-1/3">
                    <RoomCreater onClick={() => alert("add new room")} />
                  </Box>
                </Box>
            ) : (
                <Box>
                  // TODO:
                  <p className="text-white text-2xl font-bold ">Oops!!!! </p>
                </Box>
            )}
          </Box>
        </Box>
      </Page>
  );
};

export default PrivateRoomPage;
