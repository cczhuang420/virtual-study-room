import {Button} from "@mui/material";
import React from "react";


const AuthBlock = ({onLogin, onSignup}) => {
  return (
    <>
      <Button
        variant={"text"}
        sx={{color: "#fff"}}
        onClick={onLogin}
      >
        Login
      </Button>
      <Button
        sx={{backgroundColor: "#7012d3", borderRadius: "10000px"}}
        onClick={onSignup}
      >
        Sign up
      </Button>
    </>
  )
}

export default AuthBlock
