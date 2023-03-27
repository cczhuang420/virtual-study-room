import React from 'react'
import {Box} from "@mui/material";
import google from "../assets/google-logo.svg"
import {useAuth} from "../providers/AuthProvider.jsx";

const ThirdPartyLogin = () => {

  const {googleSignIn} = useAuth()

  return (
    <Box>
      <Box onClick={() => googleSignIn()}>
        <img src={google} alt={""} />
      </Box>
    </Box>
  )
}

export default ThirdPartyLogin
