import React from 'react'
import {Box, styled} from "@mui/material";
import google from "../assets/google-logo.svg"
import github from "../assets/github-logo.svg"
import {useAuth} from "../providers/AuthProvider.jsx";

const ThirdPartyLogin = () => {

  const {googleSignIn, githubSignIn} = useAuth()

  return (
    <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
      <StyledBox onClick={() => googleSignIn()}>
        <img src={google} alt={""} />
      </StyledBox>
      <StyledBox onClick={() => githubSignIn()}>
        <img src={github} alt={""} />
      </StyledBox>
    </Box>
  )
}

const StyledBox = styled(Box)({
  marginRight: "10px"
})

export default ThirdPartyLogin
