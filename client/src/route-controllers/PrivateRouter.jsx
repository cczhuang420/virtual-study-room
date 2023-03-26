import {Navigate, Route, Routes} from "react-router-dom"
import DemoDashboard from "../pages/DemoDashboard";

const PrivateRouter = () => {
  return (
    <>
      <Routes>
        <Route path={"/public-rooms"} element={<DemoDashboard />} />
        <Route path={"*"} element={<Navigate to={"/public-rooms"} />} />
      </Routes>
    </>
  )
}

export default PrivateRouter
