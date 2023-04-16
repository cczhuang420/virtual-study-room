import React, {useMemo, useState} from "react"
import {useFormik} from "formik";
import {InputLabel, TextField, Box, FormHelperText} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import ThirdPartyLogin from "./ThirdPartyLogin.jsx";

const LoginForm = ({onSubmit}) => {

  const [error, setError] = useState("")
  const [loggingIn, setLogging] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: async (values) => {
      setLogging(true)
      try {
        await onSubmit(values)
      } catch (e) {
        setError("Invalid credential")
      } finally {
        setLogging(false)
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{mb: {xs: 3, md: 5}}}>
        <InputLabel>
          Email/Username
        </InputLabel>
        <TextField
          name={"email"}
          onChange={formik.handleChange}
          type={"text"}
        />
      </Box>
      <Box sx={{mb: {xs: 3, md: 5}}}>
        <InputLabel>
          Password
        </InputLabel>
        <TextField
          name={"password"}
          onChange={formik.handleChange}
          type={"password"}
        />
      </Box>
      <Box>
        <FormHelperText>
          {error}
        </FormHelperText>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row-reverse"
          },
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-end",
            md: "center"
          }
        }}
      >
        <LoadingButton
          type={"submit"}
          loading={loggingIn}
          variant={"contained"}
          sx={{
            width: {xs: "100%", md: "auto"},
            mb: 2
          }}
        >
          Submit
        </LoadingButton>
        <ThirdPartyLogin onError={() => setError("Your email exists with different credential.")} />
      </Box>
    </form>
  )
}

export default LoginForm
