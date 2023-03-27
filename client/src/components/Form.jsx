import React, {useMemo} from "react"
import {useFormik} from "formik";
import {InputLabel, TextField, Box, Button} from "@mui/material";

const Form = ({fields, onSubmit, space}) => {

  const initialValues = useMemo(() => {
    const res = {}
    fields.forEach(field => res[field] = "")
    return res
  }, [fields])

  const formik = useFormik({
    initialValues,
    onSubmit
  })

  const formElements = useMemo(() => {
    console.log(123)
    return Object.keys(formik.values).map((key) => (
      <Box key={`${+new Date()}${Math.random()}`} sx={{mb: space}}>
        <InputLabel>{key}</InputLabel>
        <TextField
          name={key}
          onChange={formik.handleChange}
          type={key.toLowerCase().includes("password") ? "password" : "text"}
        />
      </Box>
    ))
  }, [fields.join(""), space])

  return (
    <form onSubmit={formik.handleSubmit}>
      {formElements}
      <Box sx={{textAlign: "right"}}>
        <Button type={"submit"}>Submit</Button>
      </Box>
    </form>
  )
}

export default Form
