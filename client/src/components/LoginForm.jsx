import React, {useMemo, useState} from "react"
import {useFormik} from "formik";
import {InputLabel, TextField, Box, Button, FormHelperText} from "@mui/material";
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

  const formElements = useMemo(() => {
    return Object.keys(formik.values).map((key) => (
      <Box key={key} sx={{mb: {xs: 3, md: 5}}}>
        <InputLabel>
          {key.substring(0, 1).toUpperCase() + key.substring(1, key.length).toLowerCase()}
        </InputLabel>
        <TextField
          name={key}
          onChange={formik.handleChange}
          type={key.toLowerCase().includes("password") ? "password" : "text"}
        />
      </Box>
    ))
  }, [])

  return (
    <form onSubmit={formik.handleSubmit}>
      {formElements}
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
        <ThirdPartyLogin />
      </Box>
    </form>
  )
}

export default LoginForm
