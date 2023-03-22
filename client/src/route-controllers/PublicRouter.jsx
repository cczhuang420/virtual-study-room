import {Route, Routes, Navigate} from "react-router-dom"
import DemoLoginPage from "../pages/DemoLoginPage.jsx";
import DemoSignupPage from "../pages/DemoSignupPage.jsx";

const PublicRouter = () => {
  return (
    <>
      <Routes>
        <Route path={"/login"} element={<DemoLoginPage />} />
        <Route path={"/signup"} element={<DemoSignupPage />} />
        <Route path={"*"} element={<Navigate to={"/login"} />} />
      </Routes>
    </>
  )
}

export default PublicRouter
