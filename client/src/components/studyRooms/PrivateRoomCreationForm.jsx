import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import BackgroundSelectorGrid from "../BackgroundSelectorGrid.jsx";
import sampleBg from "../../assets/backgrounds/background-card.svg";

const PrivateRoomCreationForm = () => {
  const [roomName, setRoomName] = useState("");
  const [visibleToFriends, setVisibleToFriends] = useState(false);
  const [image, setImage] = useState();
  const [error, setError] = useState("");

  const createRoomHandler = useCallback(() => {
    if (roomName.replaceAll(" ", "") === "") {
      setError("Please enter a valid room name");
      return;
    } else if (image === undefined) {
      setError("Please select a background image");
      return;
    }
    alert(`${roomName}, ${visibleToFriends}, ${image}`);
  }, [roomName, visibleToFriends, image]);

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant={"h2"} sx={{ color: "white" }}>
          Oops, you have not created your private room
        </Typography>
      </Box>
      <Box sx={{ mb: 4 }}>
        <InputLabel sx={{ color: "white", fontSize: "18px" }}>
          Room Name
        </InputLabel>
        <TextField
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          sx={{
            width: "50%",
            backgroundColor: "rgba(255,255,255,.5)",
            borderRadius: "5px",
            "& fieldset": {
              border: "none",
            },
          }}
        />
      </Box>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={visibleToFriends}
              sx={{
                "& .MuiSvgIcon-root": { fontSize: "18px", color: "white" },
              }}
              onChange={() => setVisibleToFriends((prevState) => !prevState)}
            />
          }
          label={"Visible to friends"}
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: "18px",
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
              fontSize: "25px",
              color: "white",
            }}
          />
        </Tooltip>
      </Box>
      <Box sx={{ mb: 4 }}>
        <BackgroundSelectorGrid
          images={Array(4).fill(sampleBg)}
          onClick={(index) =>
            setImage((image) => (index === image ? undefined : index))
          }
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
        <FormHelperText sx={{ fontSize: "16px" }}>{error}</FormHelperText>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
        <Button onClick={createRoomHandler} sx={{ backgroundColor: "#7012d3" }}>
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default PrivateRoomCreationForm;
