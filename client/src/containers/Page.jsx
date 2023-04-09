import {Box, IconButton} from "@mui/material";
import {useCallback, useEffect, useMemo} from "react";
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from "../assets/logo.svg"
import {useAuth} from "../providers/AuthProvider.jsx";
import tempProfileImage from "../assets/temp-profile-image.svg"

const Page = ({
  children,
  verticalCenter = false,
  horizontalCenter = false,
  title = "Virtual Study Room",
  loading = false,
  excludeNavigation = false,
  sx
}) => {

  const {logout} = useAuth()

  const logoutHandler = useCallback(() => logout(), [logout])

  const iconClickHandler = useCallback(() => alert("Icon click"), [])

  const profileClickHandler = useCallback(() => alert("profile click"), [])

  useEffect(() => {
    document.title = title
  }, [title])

  const navigationOptions = useMemo(() => [
    {
      icon: <PublicIcon />,
      onClick: () => alert("navigate to public room")
    },
    {
      icon: <PublicOffIcon />,
      onClick: () => alert("navigate to private room")
    },
    {
      icon: <LeaderboardIcon />,
      onClick: () => alert("navigate to leaderboard")
    },
    {
      icon: <ShoppingCartIcon />,
      onClick: () => alert("navigate to marketplace")
    }
  ], [])


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
        width: "100vw",
        background: "linear-gradient(to right, #400A71, #1D0652)",
        overflowX: "hidden",
        position: "relative",
        display: "flex",
        ...sx
      }}
    >
      {!excludeNavigation && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "primary.dark",
            padding: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Box>
            <Box
              onClick={iconClickHandler}
              sx={{cursor: "pointer"}}
            >
              <img src={logo} alt={""} />
            </Box>
            <Box
              sx={{
                borderBottom: "1px solid white",
                margin: 1
              }}
            />
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
              {navigationOptions.map(({icon, onClick}) => (
                <Box sx={{marginY: 1}}>
                  <IconButton
                    onClick={onClick}
                    sx={{
                      "& svg": {
                        color: "white",
                        fontSize: "35px"
                      }
                    }}
                  >
                    {icon}
                  </IconButton>
                </Box>
              ))}
              <Box sx={{marginY: 1}}>
                <IconButton
                  onClick={profileClickHandler}
                  sx={{
                    "& svg": {
                      color: "white",
                      fontSize: "35px"
                    }
                  }}
                >
                  <img src={tempProfileImage} alt={""} />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box>
            <IconButton
              onClick={logoutHandler}
              sx={{
                "& svg": {
                  color: "white",
                  fontSize: "35px"
                }
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        </Box>
      )}
      <Box
        sx={{
          width: "100%",
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: verticalCenter ? "center" : "flex-start",
          alignItems: horizontalCenter ? "center" : "flex-start"
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Page
