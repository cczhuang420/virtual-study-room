import React, {useMemo, useState} from "react"
import {Box, Typography} from "@mui/material";
import Switcher from "./Switcher.jsx";
import Form from "./Form.jsx";

const AuthModal = ({onLogin, onSignup, onStatusChange}) => {

  const [form, setForm] = useState("log in")

  const formData = useMemo(() =>
    (form === "log in" ? ({
      fields: ["Username", "Password"],
      space: 5,
      onSubmit: onLogin
    }) : ({
      fields: ["Username", "Email", "Password", "Confirm Password"],
      space: 2,
      onSubmit: onSignup
    })),
    [form])

  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: 2,
        borderRadius: "10px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&>.MuiBox-root": {
          display: "flex", justifyContent: "center"
        }
      }}
    >
      <Box>
        <Box sx={{width: "50%"}}>
          <Switcher
            options={["Log in", "Sign up"]}
            onStatusChange={(status) => setForm(status)}
          />
        </Box>
      </Box>
      <Box sx={{flex: 1, display: "flex", alignItems: "center"}}>
        <Box sx={{width: "70%"}}>
          <Form
            {...formData}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default AuthModal
