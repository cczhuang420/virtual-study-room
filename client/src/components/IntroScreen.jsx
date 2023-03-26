import React from "react"
import Page from "../containers/HomePageContainer.jsx";
import {Box, styled, Typography} from "@mui/material";
import LottiePlayer from "./LottiePlayer.jsx";

const IntroScreen = ({header1, header2, animation, description, textOnRight}) => {

  return (
    <Page verticalCenter horizontalCenter>
      {header1 && (
        <Box sx={{pt: "30px"}}>
          <StyledTypography
            variant={"h2"}
            sx={{
              fontSize: {
                xs: "35px",
                md: "48px"
              },
            }}
          >
            {header1}
          </StyledTypography>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: textOnRight ? "row" : "row-reverse"
          }
        }}
      >
        <Box sx={{flex: {xs: "none", md: 1}}}>
          <LottiePlayer animationData={animation} adjustSize={0.7} />
        </Box>
        <Box
          sx={{
            flex: {xs: "none", md: 1},
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Box sx={{width: "80%"}}>
            <StyledTypography
              variant={"h4"}
              sx={{
                mb: "15px",
                fontSize: {
                  xs: "30px",
                  md: "40px"
                }
              }}
            >
              {header2}
            </StyledTypography>
            <StyledTypography
              sx={{
                textAlign: "left",
                fontSize: {
                  xs: "12px",
                  md: "17px"
                }
              }}
            >
              {description}
            </StyledTypography>
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
