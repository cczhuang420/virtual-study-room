import React, {useCallback, useRef, useState} from "react"
import {useFormik} from "formik";
import {
  InputLabel,
  Box,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
  IconButton,
  TextField
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import ThirdPartyLogin from "./ThirdPartyLogin.jsx";
import {useFetchUsernameSuggestion} from "../api/user-api.js";

const SignupForm = ({onSubmit}) => {

  const [error, setError] = useState("")
  const [signingUp, setSigningUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [gettingSuggestion, setGettingSuggestion] = useState(false)

  const baseName = useRef("")

  const fetchUsernameSuggestion = useFetchUsernameSuggestion()

  const getSuggestedUsername = useCallback(async () => {
    setGettingSuggestion(true)
    try {
      const username = await fetchUsernameSuggestion(
        baseName.current.replaceAll(" ", "") === "" ?
          undefined : baseName.current
      )
      await formik.setValues({
        ...formik.values,
        username
      })
    } catch (e) {
      console.error(e)
    } finally {
      setGettingSuggestion(false)
    }

  }, [fetchUsernameSuggestion])

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: ""
    },
    onSubmit: async (values) => {
      // password requirement is not configurable??!!??!!
      // https://stackoverflow.com/questions/49183858/is-there-a-way-to-set-a-password-strength-for-firebase
      if (Object.values(values).some(v => v.length === 0)) {
        setError("Please complete all fields")
        return
      } else if (values.password.length < 8) {
        setError("Password must contain at least 8 characters")
        return
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        setError("Invalid email address")
        return
      }

      setSigningUp(true)
      try {
        await onSubmit(values)
      } catch (e) {
        console.error(e)
        if (e.message.includes("auth/email-already-in-use")) {
          setError("Email is already taken")
        } else {
          setError(e.message)
        }
      } finally {
        setSigningUp(false)
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{mb: {xs: 1, md: 2}}}>
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <InputLabel>Username</InputLabel>
          <LoadingButton
            loading={gettingSuggestion}
            variant={"text"}
            onClick={getSuggestedUsername}
          >
            Get random name
          </LoadingButton>
        </Box>
        <TextField
          name={"username"}
          value={formik.values.username}
          onChange={(e) => {
            formik.handleChange(e)
            baseName.current = e.target.value
          }}
        />
      </Box>
      <Box sx={{mb: {xs: 1, md: 2}}}>
        <InputLabel>Email</InputLabel>
        <TextField name={"email"} onChange={formik.handleChange} />
      </Box>
      <Box sx={{mb: {xs: 1, md: 2}}}>
        <InputLabel>Password</InputLabel>
        <OutlinedInput
          name={"password"}
          onChange={formik.handleChange}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position={"end"}>
              <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          }
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
          loading={signingUp}
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

export default SignupForm
