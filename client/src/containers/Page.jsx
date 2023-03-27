import {Box} from "@mui/material";
import {useEffect} from "react";

const Page = ({children, verticalCenter, horizontalCenter, title, loading, sx}) => {

  useEffect(() => {
    document.title = title
  }, [title])

  if (loading) {
    return (
      <Box>
        Loading...
      </Box>
    )
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: verticalCenter ? "center" : "flex-start",
        alignItems: horizontalCenter ? "center" : "flex-start",
        background: "linear-gradient(to right, #400A71, #1D0652)",
        ...sx
      }}
    >
      {children}
    </Box>
  )
}

export default Page
