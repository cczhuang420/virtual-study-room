import {useAuth} from "./providers/AuthProvider.jsx";
import PublicRouter from "./route-controllers/PublicRouter.jsx";
import PrivateRouter from "./route-controllers/PrivateRouter.jsx";

const App = () => {

  const {getCurrentUser} = useAuth()

  if (!getCurrentUser()) {
    console.log("Public Router")
    return <PublicRouter />
  } else {
    console.log("Private Router")
    return <PrivateRouter />
  }
}

export default App
