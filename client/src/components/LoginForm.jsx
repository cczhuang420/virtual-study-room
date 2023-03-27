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
      <Box key={key} sx={{mb: 5}}>
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
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <LoadingButton
          type={"submit"}
          loading={loggingIn}
          variant={"contained"}
        >
          Submit
        </LoadingButton>
        <ThirdPartyLogin />
      </Box>
    </form>
  )
}

export default LoginForm
