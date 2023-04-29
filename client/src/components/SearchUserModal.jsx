import React, {useMemo, useState} from "react"
import {Modal, Box, IconButton, TextField} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"
import {useMutation} from "../hooks/useMutation.js";
import {HTTP_METHOD} from "../hooks/http-methods.js";
import {useFetch} from "../hooks/useFetch.js";
import profilePlaceholder from "../assets/profiles/profile-placeholder.svg"
import FriendList from "./FriendList.jsx";
import {useAuth} from "../providers/AuthProvider.jsx";

const SearchUserModal = ({open, onClose}) => {
  const [searchText, setSearchText] = useState("")
  const {isLoading, data} = useFetch("users")
  const allUsers = !isLoading ?
    data.map(({_id, username}) => ({id: _id, name: username, image: profilePlaceholder})) : []

  const {getCustomUser} = useAuth()
  console.log(getCustomUser())
  return (
    <Modal
      open={open}
      slotProps={{
        backdrop: {
          style: {
            backgroundColor: "rgba(180,150,160,0.1)",
            backdropFilter: "blur(3px)",
          },
        },
      }}
    >
      <Box
        sx={{
          width: { xs: "76%", sm: "50%", md: "35%" },
          height: { xs: "70%", sm: "70%", md: "75%" },
          backgroundColor: "#1B0137",
          color: "white",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          padding: 4,
          borderRadius: 2
        }}
      >
        <Box sx={{ position: "absolute", top: 4, right: 4 }}>
          <IconButton onClick={onClose}>
            <CloseIcon sx={{color: "white"}} />
          </IconButton>
        </Box>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <TextField
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder={"Search users with username..."}
            sx={{
              backgroundColor: "rgba(255,255,255,.2)",
              borderRadius: "5px",
              "& fieldset": {
                border: "none"
              },
              "& input": {
                color: "white"
              }
            }}
          />
          <Box
            sx={{
              overflowY: "scroll",
              flex: 1,
              mt: 1,
            }}
          >
            <FriendList
              friends={allUsers.filter(({name}) => name.includes(searchText))}
              onAddFriend={(id) => console.log("add " + id)}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default SearchUserModal
