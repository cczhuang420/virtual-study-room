import Page from "../containers/Page.jsx";
import {Typography} from "@mui/material";
import {useAuth} from "../providers/AuthProvider.jsx";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const DemoSignupPage = () => {

  const {logout} = useAuth()
  const navigate = useNavigate()

  return (
    <Page title={"Signup"} horizontalCenter verticalCenter>
      <Typography variant={"h1"}>HomePage</Typography>
      <Button onClick={() => logout()}>Sign out</Button>
      <Button onClick={() => navigate("/token")}>Get Token</Button>
    </Page>
  )
}

export default DemoSignupPage
