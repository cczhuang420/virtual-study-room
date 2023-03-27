import React from 'react'
import {Box} from "@mui/material";
import google from "../assets/google-logo.svg"
import github from "../assets/github-logo.svg"
import {useAuth} from "../providers/AuthProvider.jsx";

const ThirdPartyLogin = () => {

  const {googleSignIn, githubSignIn} = useAuth()

  return (
    <Box>
      <Box onClick={() => googleSignIn()}>
        <img src={google} alt={""} />
      </Box>
      <Box onClick={() => githubSignIn()}>
        <img src={github} alt={""} />
      </Box>
    </Box>
  )
}

export default ThirdPartyLogin
