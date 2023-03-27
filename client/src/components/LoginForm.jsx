import React, {useMemo} from "react"
import {useFormik} from "formik";
import {InputLabel, TextField, Box, Button} from "@mui/material";

const LoginForm = ({onSubmit}) => {

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    onSubmit,
  })

  const formElements = useMemo(() => {
    return Object.keys(formik.values).map((key) => (
      <Box key={`${+new Date()}${Math.random()}`} sx={{mb: 5}}>
        <InputLabel>{key}</InputLabel>
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
      <Box sx={{textAlign: "right"}}>
        <Button type={"submit"}>Submit</Button>
      </Box>
    </form>
  )
}

export default LoginForm
