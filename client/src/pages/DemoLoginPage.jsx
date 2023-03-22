import Page from "../containers/Page.jsx";
import {TextField} from "@mui/material";
import {useState} from "react";
import {useAuth} from "../providers/AuthProvider.jsx";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom"

const DemoLoginPage = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {login} = useAuth()
  const navigate = useNavigate()

  return (
    <Page title={"Login"} horizontalCenter verticalCenter>
      <TextField label={"email"} value={email} onChange={e => setEmail(e.target.value)} />
      <TextField label={"password"} value={password} onChange={e => setPassword(e.target.value)} />
      <Button onClick={() => login(email, password)}>Login</Button>
      <Button variant={"text"} onClick={() => navigate("/signup")}>Signup</Button>
    </Page>
  )
}

export default DemoLoginPage
