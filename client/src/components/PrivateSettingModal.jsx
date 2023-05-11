import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  Fade,
  FormControlLabel,
  IconButton,
  Modal,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close.js";
import ModalProductCard from "./ModalProductCard.jsx";
import AssetLabel from "./AssetLabel.jsx";
import assetMoney from "../assets/asset-money-icon.svg";
import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline.js";
import BackgroundSelectorGrid from "./BackgroundSelectorGrid.jsx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "86%", sm: "60%", md: "45%" },
  height: { xs: "75%", sm: "75%", md: "80%" },
  bgcolor: "#1b0137",
  borderRadius: "13px",
  border: "1px #1b0137 solid",
  overflowX: "hidden",
  p: 1,
};

const PrivateSettingModal = ({ open, handleClose, roomData }) => {
  useEffect(() => {
    console.log(roomData);
  }, []);

  const [visibleToFriend, setVisibleToFriend] = useState(
    roomData?.isVisibleToFriends
  );
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          style: {
            backgroundColor: "rgba(180,150,160,0.1)",
            backdropFilter: "blur(3px)",
          },
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            height={"100%"}
            width={"100%"}
            p={1.5}
          >
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                variant={"h5"}
                color={"white"}
                pt={1}
                fontWeight={700}
              >
                Private Room Setting
              </Typography>
              <IconButton
                onClick={() => {
                  handleClose();
                  console.log(roomData);
                }}
              >
                <CloseIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Box>
            <Box mt={1} ml={4} sx={{ display: "flex", alignItems: "center" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={visibleToFriend}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: "18px",
                        color: "white",
                      },
                    }}
                    onChange={() =>
                      setVisibleToFriend((prevState) => !prevState)
                    }
                  />
                }
                label={"Visible to friends"}
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "1rem",
                    color: "white",
                  },
                }}
              />
              <Tooltip
                title={
                  "Enabling this will allow your friends to see your private room from your profile"
                }
              >
                <HelpOutlineIcon
                  sx={{
                    fontSize: "1.3rem",
                    color: "white",
                  }}
                />
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default PrivateSettingModal;
