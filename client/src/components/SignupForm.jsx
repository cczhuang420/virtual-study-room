import React, {useMemo, useState} from "react"
import {useFormik} from "formik";
import {
  InputLabel,
  Box,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
  IconButton
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"

const SignupForm = ({onSubmit}) => {

  const [error, setError] = useState("")
  const [signingUp, setSigningUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const formik = useFormik({
    initialValues: {
      nickname: "",
      email: "",
      password: ""
    },
    onSubmit: async (values) => {
      if (Object.values(values).some(v => v.length === 0)) {
        setError("Please complete all fields")
        return
      }
      // password requirement is not configurable??!!??!!
      // https://stackoverflow.com/questions/49183858/is-there-a-way-to-set-a-password-strength-for-firebase
      if (values.password.length < 8) {
        setError("Password must contain at least 8 characters")
        return
      }
      if (!/\S+@\S+\.\S+/.test(values.email)) {
        setError("Invalid email address")
        return
      }
      setSigningUp(true)
      try {
        await onSubmit(values)
      } catch (e) {
        console.log(e)
        if (e.message.includes("auth/email-already-in-use")) {
          setError("Email already exists")
        }
      } finally {
        setSigningUp(false)
      }
    },
  })

  const formElements = useMemo(() => {
    return Object.keys(formik.values).map((key) => (
      <Box key={key} sx={{mb: 2}}>
        <InputLabel>
          {key.substring(0, 1).toUpperCase() + key.substring(1, key.length).toLowerCase()}
        </InputLabel>
        <OutlinedInput
          name={key}
          onChange={formik.handleChange}
          type={(key.toLowerCase().includes("password") && !showPassword) ? "password" : "text"}
          endAdornment={
            key.toLowerCase().includes("password") ?
              <InputAdornment position={"end"}>
                <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment> : null
          }
        />
      </Box>
    ))
  }, [showPassword])

  return (
    <form onSubmit={formik.handleSubmit}>
      {formElements}
      <Box>
        <FormHelperText>
          {error}
        </FormHelperText>
      </Box>
      <Box sx={{textAlign: "right"}}>
        <LoadingButton
          type={"submit"}
          loading={signingUp}
          variant={"contained"}
        >
          Submit
        </LoadingButton>
      </Box>
    </form>
  )
}

export default SignupForm
