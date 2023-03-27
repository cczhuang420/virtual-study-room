import React, {useState} from "react"
import {Box} from "@mui/material";
import Switcher from "./Switcher.jsx";
import LoginForm from "./LoginForm.jsx";
import SignupForm from "./SignupForm.jsx";
import ThirdPartyLogin from "./ThirdPartyLogin.jsx";

const AuthModal = ({onLogin, onSignup}) => {

  const [form, setForm] = useState("log in")

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
      <Box sx={{flex: 1, display: "flex", alignItems: "center", flexDirection: "column"}}>
        <Box sx={{width: "70%"}}>
          {form.toLowerCase() === "log in" ?
            <LoginForm
              onSubmit={(values) => onLogin(values)}
            /> : <SignupForm
              onSubmit={(values) => onSignup(values)}
            />
          }
        </Box>
        <Box sx={{mt: 3}}>
          <ThirdPartyLogin />
        </Box>
      </Box>
    </Box>
  )
}

export default AuthModal
