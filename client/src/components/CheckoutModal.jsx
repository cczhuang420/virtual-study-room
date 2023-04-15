import {
  Box,
  Modal,
  Typography,
  Fade,
  Backdrop,
  IconButton,
  Stack,
  Button,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RoomCard from "./RoomCard.jsx";
import AssetLabel from "./AssetLabel.jsx";
import assetMoney from "../assets/asset-money-icon.svg";
import { useModal } from "../App.jsx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "76%", sm: "50%", md: "35%" },
  height: { xs: "70%", sm: "70%", md: "75%" },
  bgcolor: "#1b0137",
  borderRadius: "13px",
  border: "1px #1b0137 solid",
  overflowX: "hidden",
  p: 1,
};

const CheckoutModal = () => {
  const { open, handleClose, content } = useModal();
  const theme = useTheme();

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
          >
            <Box display={"flex"} flexDirection={"row-reverse"}>
              <IconButton onClick={handleClose}>
                <CloseIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Box>
            <Box pl={2.5} height={"6%"}>
              <Typography variant={"h5"} color={"#fff"} fontWeight={500}>
                {content.title}
              </Typography>
            </Box>
            <Box p={2.5} height={"50%"} width={"100%"}>
              <RoomCard
                title={content.imageTitle}
                showPeopleAmount={false}
                image={content.image}
                showVagueBackground={content.isRoomCard}
              />
            </Box>
            <Box pl={2.5}>
              <Typography
                variant={"body1"}
                sx={{
                  color: "#fff",
                  fontWeight: 550,
                }}
              >{`$ ${content.cost}`}</Typography>
            </Box>
            <Stack
              p={2.5}
              direction={"row"}
              spacing={6}
              height={"15%"}
              width={"100%"}
            >
              <Box>
                <Typography color={"#fff"}>Your Total Coins:</Typography>
              </Box>
              <Box height={"95%"} width={"33%"}>
                <AssetLabel image={assetMoney} value={content.money} />
              </Box>
            </Stack>
            <Box
              px={2.5}
              py={1}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Button
                size={"large"}
                variant={"outlined"}
                onClick={handleClose}
                sx={{
                  border: "1px #3182ce solid",
                  color: "#3182ce",
                }}
              >
                Cancel
              </Button>
              <Button
                size={"large"}
                variant={"contained"}
                onClick={content.onClick}
                sx={{
                  backgroundColor: theme.palette.secondary.dark,
                  color: "#fff",
                }}
              >
                Apply
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CheckoutModal;
