import {Navigate, Route, Routes} from "react-router-dom"
import Page from "../containers/Page.jsx"

const PrivateRouter = () => {
  return (
    <>
      <Routes>
        <Route path={"/public-rooms"} element={<Page>public-rooms</Page>} />
        <Route path={"*"} element={<Navigate to={"/public-rooms"} />} />
      </Routes>
    </>
  )
}

export default PrivateRouter
