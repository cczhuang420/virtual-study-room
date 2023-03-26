import {Route, Routes, Navigate} from "react-router-dom"
import DemoLoginPage from "../pages/DemoLoginPage.jsx";
import DemoSignupPage from "../pages/DemoSignupPage.jsx";
import Homepage from "../pages/Homepage.jsx";

const PublicRouter = () => {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/login"} element={<DemoLoginPage />} />
        <Route path={"/signup"} element={<DemoSignupPage />} />
        <Route path={"*"} element={<Navigate to={"/"} />} />
      </Routes>
    </>
  )
}

export default PublicRouter
