import React from "react"
import Page from "../containers/HomePageContainer.jsx";
import {Box, styled, Typography} from "@mui/material";
import LottiePlayer from "./LottiePlayer.jsx";

const IntroScreen = ({header1, header2, animation, description, textOnRight}) => {

  return (
    <Page verticalCenter horizontalCenter>
      {header1 && (
        <Box>
          <StyledTypography variant={"h2"}>
            {header1}
          </StyledTypography>
        </Box>
      )}
      <Box sx={{display: "flex", flexDirection: textOnRight ? "row" : "row-reverse"}}>
        <Box sx={{flex: 1}}>
          <LottiePlayer animationData={animation} adjustSize={0.7} />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Box sx={{width: "80%"}}>
            <StyledTypography variant={"h4"} sx={{mb: "15px"}}>
              {header2}
            </StyledTypography>
            <StyledTypography sx={{textAlign: "left"}}>{description}</StyledTypography>
          </Box>
        </Box>
      </Box>
    </Page>
  )
}

const StyledTypography = styled(Typography)({
  color: "#fff", textAlign: "center", fontFamily: 'Rubik'
})

export default IntroScreen
