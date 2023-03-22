import {useAuth} from "./providers/AuthProvider.jsx";
import PublicRouter from "./route-controllers/PublicRouter.jsx";
import PrivateRouter from "./route-controllers/PrivateRouter.jsx";

function App() {

  const {getCurrentUser} = useAuth()

  if (!getCurrentUser()) {
    return <PublicRouter />
  } else {
    return <PrivateRouter />
  }
}

export default App
