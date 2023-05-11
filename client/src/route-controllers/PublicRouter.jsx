import { Route, Routes, Navigate } from "react-router-dom"
import Homepage from "../pages/Homepage.jsx";
import LoginPage from "../pages/LoginPage.jsx";

/**
 * The public router can route to the "public pages", such as HomePage and LoginPage.
 */

const PublicRouter = () => {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"*"} element={<Navigate to={"/"} />} />
      </Routes>
    </>
  )
}

export default PublicRouter
