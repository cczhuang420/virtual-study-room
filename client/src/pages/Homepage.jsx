import React, {useCallback, useEffect, useMemo, useState} from "react"
import {useNavigate} from "react-router-dom";
import HomeScreen from "../components/HomeScreen.jsx";
import IntroScreen from "../components/IntroScreen.jsx";
import text from "../constants/homepage-text.json"
import {Box} from "@mui/material"

const Homepage = () => {

  const [introScreens, setIntroScreens] = useState([])

  const navigate = useNavigate()

  const loginHandler = useCallback(() => () => navigate("/signup"), [navigate])
  const signupHandler = useCallback(() => () => navigate("/signup"), [navigate])

  useEffect(() => {
    ;(async () => {
      const introSections = await Promise.all(text.map(async (t, i) => {
        const animationId = t.header2.toLowerCase().replaceAll(" ", "-")
        const module = await import(`../assets/${animationId}-animation.json`)
        const anim = JSON.parse(JSON.stringify(module)).default
        return <IntroScreen {...t} animation={JSON.parse(JSON.stringify(anim))} textOnRight={i % 2 === 0} />
      }))
      setIntroScreens(introSections)
    })()
  }, [])

  return (
    <>
      <HomeScreen onLogin={loginHandler} onSignup={signupHandler} />
      {introScreens}
      <Box sx={{mb: "20px"}} />
    </>
  )
}

export default Homepage
