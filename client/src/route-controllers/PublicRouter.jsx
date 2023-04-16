import {Route, Routes, Navigate} from "react-router-dom"
import DemoSignupPage from "../pages/DemoSignupPage.jsx";
import Homepage from "../pages/Homepage.jsx";
import LoginPage from "../pages/LoginPage.jsx";

const PublicRouter = () => {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/signup"} element={<DemoSignupPage />} />
        {/*<Route path={"*"} element={<Navigate to={"/"} />} />*/}
      </Routes>
    </>
  )
}

export default PublicRouter
