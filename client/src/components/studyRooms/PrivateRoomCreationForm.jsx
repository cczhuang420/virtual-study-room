import React, {useCallback, useEffect, useState} from "react";
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
import {useAuth} from "../../providers/AuthProvider.jsx";
import {useMutation} from "../../hooks/useMutation.js";
import {HTTP_METHOD} from "../../hooks/http-methods.js";

const PrivateRoomCreationForm = ({onCreateRoom, onCancel}) => {
  const {getCustomUser} = useAuth()
  const [roomName, setRoomName] = useState("");
  const [visibleToFriends, setVisibleToFriends] = useState(false);
  const [image, setImage] = useState();
  const [error, setError] = useState("");
  const [backgroundList, setBackgroundList] = useState([])

  const fetchProductHandler = useMutation("products/one", HTTP_METHOD.GET)
  const createPrivateRoomHandler = useMutation("privateRooms", HTTP_METHOD.POST)

  useEffect(() => {
    ;(async () => {
      const assetIds = getCustomUser().assets
      const allAssets = await Promise.all(assetIds.map(id => fetchProductHandler.run({
        query: {id}
      })))
      const bgList = allAssets
        .filter(({type}) => type === "background")
        .map(({url}) => `/src/assets/backgrounds/${url}`)
      setBackgroundList(bgList)
    })()
  }, [getCustomUser, setBackgroundList])

  const createRoomHandler = useCallback(async () => {
    if (roomName.replaceAll(" ", "") === "") {
      setError("Please enter a valid room name");
      return;
    } else if (image === undefined) {
      setError("Please select a background image");
      return;
    }
    const body = {
      ownerId: getCustomUser()._id,
      name: roomName,
      users: [],
      backgroundUrl: image.split("/").reverse()[0],
      isVisibleToFriends: visibleToFriends
    }
    await createPrivateRoomHandler.run({
      body
    })
    onCreateRoom()
    location.reload()
  }, [roomName, visibleToFriends, image]);

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant={"h2"} sx={{ color: "white" }}>
          Create Your a New Private Room
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
          images={backgroundList}
          onClick={(index) =>
            setImage((image) => (index === image ? undefined : index))
          }
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
        <FormHelperText sx={{ fontSize: "16px" }}>{error}</FormHelperText>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
        {onCancel && (
          <Button
            onClick={onCancel || (() => {})}
            variant={"outlined"}
            sx={{borderColor: "#7012d3", color: "#7012d3", mr: 2}}
          >
            Cancel
          </Button>
        )}
        <Button onClick={createRoomHandler} sx={{ backgroundColor: "#7012d3" }}>
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default PrivateRoomCreationForm;
