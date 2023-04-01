import Page from "../containers/Page.jsx";
import {useAuth} from "../providers/AuthProvider.jsx";

const TokenPage = () => {
  const {getAccessToken} = useAuth()

  console.log(getAccessToken())

  return (
    <Page>

    </Page>
  )
}

export default TokenPage
