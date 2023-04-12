import React, {useState} from "react"
import {Box, Button, TextField, Typography} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useAuth} from "../providers/AuthProvider.jsx";

/*
chatHistory: array of {
  name: string
  profileImageUrl: string
  content: string
}

targetUser: {
  name: string
  uid: string
}

userList: undefined or array of {
  name: string
  uid: string
  isOnline: boolean
}
 */

const ChatModal = ({chatHistory, targetUser, userList, onSend}) => {
  const [message, setMessage] = useState("")
  const {getCurrentUser} = useAuth()
  const [showUserList, setShowUserList] = useState(false)

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}
    >
      {/* HEADER */}
      <Box sx={{backgroundColor: "#C6C6C6", paddingX: 2, paddingY: 1}}>
        <Box
          onClick={() => setShowUserList(prev => !prev)}
          sx={{display: "flex", alignItems: "center", cursor: userList && "pointer"}}
        >
          <Typography variant={"h4"} sx={{color: "#3D3A3A"}}>
            {targetUser.name}
          </Typography>
          {userList && !showUserList && (
            <KeyboardArrowDownIcon />
          )}
          {userList && showUserList && (
            <KeyboardArrowUpIcon />
          )}
        </Box>
      </Box>

      {/* CHAT HISTORY */}
      <Box sx={{backgroundColor: "rgba(255,255,255,.5)", flex: 1}}>
        {chatHistory.map(({senderId, profileImageUrl, content}) => (
          <Box
            key={`${+new Date()}${Math.random()}`}
            sx={{
              display: "flex",
              alignItems: "flex-end",
              flexDirection: getCurrentUser().uid !== senderId ? "row" : "row-reverse",
              paddingY: 1,
              "& .mui-image-wrapper": {m: 0}
            }}
          >
            <Box sx={{borderRadius: "10000px", marginLeft: 1}}>
              <img src={profileImageUrl} alt={""} width={"90%"} />
            </Box>
            <Box
              sx={{
                backgroundColor: getCurrentUser().uid !== senderId ? "#7012d3" : "#CEC1DB",
                color: getCurrentUser().uid !== senderId ? "white" : "black",
                p: 1,
                borderRadius: "5px"
              }}
            >
              <Typography>{content}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* MESSAGE SEND FORM */}
      <Box sx={{backgroundColor: "#CEC1DB"}}>
        <form
          onSubmit={e => {
            e.preventDefault()
            onSend(message)
            setMessage("")
          }}
        >
          <Box display={"flex"}>
            <TextField
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder={"Enter your message..."}
              sx={{"& fieldset": {border: "none"}, boxSizing: "border-box", p: 1}}
            />
            <Button
              type={"submit"}
              variant={"text"}
              sx={{color: "#350968"}}
            >
              Send
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default ChatModal
