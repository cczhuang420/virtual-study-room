import { Box, Typography, Tabs, Tab, Stack, Container } from "@mui/material";
import { useCallback, useState } from "react";
import AssetTypeButton from "./AssetTypeButton.jsx";
import { styled } from "@mui/system";
import TabUnstyled from "@mui/base/TabUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import BackgroundGrid from "./BackgroundGrid";
import MusicList from "./MusicList";
import ProfileGrid from "./ProfileGrid";

const AssetPanel = ({ backgrounds, musics, profilePhotos }) => {
  const [value, setValue] = useState(0);

  return (
    <Stack height={"100%"} width={"100%"} direction={"column"} spacing={3}>
      <Box>
        <Typography variant={"h4"} color={"#fff"} fontWeight={500}>
          You have unlocked
        </Typography>
      </Box>
      <Box
        width={"100%"}
        minHeight={{ xs: "130px", md: "130px" }}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Box flex={1} height={"100%"} minWidth={"30%"}>
          <AssetTypeButton
            title={"Background"}
            amount={7}
            shouldHighLight={value === 0}
            onClick={() => {
              setValue(0);
            }}
          />
        </Box>
        <Box flex={0.1}></Box>
        <Box flex={1} height={"100%"} minWidth={"30%"}>
          <AssetTypeButton
            title={"Music"}
            amount={7}
            shouldHighLight={value === 1}
            onClick={() => {
              setValue(1);
            }}
          />
        </Box>
        <Box flex={0.1}></Box>
        <Box flex={1} height={"100%"} minWidth={"30%"}>
          <AssetTypeButton
            title={"Profile Image"}
            amount={7}
            shouldHighLight={value === 2}
            onClick={() => {
              setValue(2);
            }}
          />
        </Box>
      </Box>
      <Box
        width={"100%"}
        height={"70%"}
        sx={{
          backgroundColor: "#401f6a",
          borderRadius: "0.7vw",
          overflowY: "auto",
        }}
      >
        {value === 0 ? (
          <BackgroundGrid images={backgrounds} />
        ) : value === 1 ? (
          <MusicList musics={musics} />
        ) : (
          <ProfileGrid images={profilePhotos} />
        )}
      </Box>
    </Stack>
  );
};

export default AssetPanel;
