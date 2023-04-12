import React, {useState} from "react"
import {Box, Button, TextField, Typography} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from "mui-image";
import {useAuth} from "../providers/AuthProvider.jsx";

/*
chatHistory: array of {
  name: string
  profileImageUrl: string
  content: string
}

targetUser: array of a single object of {
  name
  isOnline
}
 */

const ChatModal = ({chatHistory, targetUser, onSend}) => {
  const [message, setMessage] = useState("")

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
        {Array.isArray(targetUser) ? (
          <Box>
            <Button startIcon={<KeyboardArrowDownIcon />}>
              <Typography variant={"h4"} sx={{color: "#3D3A3A"}}>
                Chat
              </Typography>
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography variant={"h4"} sx={{color: "#3D3A3A"}}>
              {targetUser.name}
            </Typography>
          </Box>
        )}
      </Box>

      {/* CHAT HISTORY */}
      <Box sx={{backgroundColor: "rgba(255,255,255,.5)", flex: 1}}>
        {chatHistory.map(({senderId, profileImageUrl, content}) => (
          <Box
            key={`${+new Date()}${Math.random()}`}
            sx={{
              display: "flex",
              alignItems: "flex-end",
              paddingY: 1,
              marginX: 1
            }}
          >
            <Box sx={{borderRadius: "10000px"}}>
              <Image src={profileImageUrl} width={"90%"} duration={0} />
            </Box>
            <Box
              sx={{
                backgroundColor: "#7012d3",
                color: "white",
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
              sx={{"& fieldset": {border: "none"}}}
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
