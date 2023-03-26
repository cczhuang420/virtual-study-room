import Page from "../containers/Page.jsx";
import {Typography} from "@mui/material";
import {useAuth} from "../providers/AuthProvider.jsx";
import {Button} from "@mui/material";

const DemoSignupPage = () => {

  const {logout} = useAuth()

  return (
    <Page title={"Signup"} horizontalCenter verticalCenter>
      <Typography variant={"h1"}>HomePage</Typography>
      <Button onClick={() => logout()}>Sign out</Button>
    </Page>
  )
}

export default DemoSignupPage
