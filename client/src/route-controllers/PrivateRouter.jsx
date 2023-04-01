import {Navigate, Route, Routes} from "react-router-dom"
import DemoDashboard from "../pages/DemoDashboard";
import TokenPage from "../pages/TokenPage.jsx";

const PrivateRouter = () => {
  return (
    <>
      <Routes>
        <Route path={"/public-rooms"} element={<DemoDashboard />} />
        <Route path={"/token"} element={<TokenPage />} />
        <Route path={"*"} element={<Navigate to={"/public-rooms"} />} />
      </Routes>
    </>
  )
}

export default PrivateRouter
