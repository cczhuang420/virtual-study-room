import Page from "../containers/Page.jsx";
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useModal } from "../App.jsx";
import backgroundImage from "../assets/backgroundRoom.svg";

const PrivateRoomPage = () => {
  const { handleOpen, setContent } = useModal();

  useEffect(() => {
    setContent({
      title: "Check out",
      imageTitle: "Unlock private room now",
      image: backgroundImage,
      cost: 400,
      money: 1289,
      isRoomCard: true,
      onClick: () => {
        console.log("hahahaha");
      },
    });
    handleOpen();
  }, []);
  return (
    <Page title={"Private Room"}>
      <Box sx={{ color: "white" }}>Private Room Page</Box>
    </Page>
  );
};

export default PrivateRoomPage;
