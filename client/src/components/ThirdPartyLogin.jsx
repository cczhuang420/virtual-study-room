import React from 'react'
import {Box, styled, Tooltip} from "@mui/material";
import google from "../assets/google-logo.svg"
import github from "../assets/github-logo.svg"
import anonymous from "../assets/anonymous-login-icon.svg"
import {useAuth} from "../providers/AuthProvider.jsx";

const ThirdPartyLogin = () => {

  const {googleSignIn, githubSignIn, anonymousSignIn} = useAuth()

  return (
    <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
      <Tooltip title={"Login with Google"}>
        <StyledBox onClick={() => googleSignIn()}>
          <img src={google} alt={""} />
        </StyledBox>
      </Tooltip>
      <Tooltip title={"Login with GitHub"}>
        <StyledBox onClick={() => githubSignIn()}>
          <img src={github} alt={""} />
        </StyledBox>
      </Tooltip>
      <Tooltip title={"Login with anonymously"}>
        <StyledBox onClick={() => anonymousSignIn()}>
          <img src={anonymous} alt={""} />
        </StyledBox>
      </Tooltip>
    </Box>
  )
}

const StyledBox = styled(Box)({
  marginRight: "15px"
})

export default ThirdPartyLogin
