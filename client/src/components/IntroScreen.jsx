import React from "react";
import Section from "../containers/HomePageSection.jsx";
import { Box, styled, Typography } from "@mui/material";
import LottiePlayer from "./LottiePlayer.jsx";

const IntroScreen = ({
  header1,
  header2,
  animation,
  description,
  textOnRight,
}) => {
  return (
    <Section verticalCenter horizontalCenter>
      {header1 && (
        <Box
          sx={{
            position: "absolute",
            top: {
              xs: 0,
              md: "50px",
            },
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <StyledTypography
            variant={"h2"}
            sx={{
              whiteSpace: "nowrap",
              fontSize: "48px",
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
            md: textOnRight ? "row" : "row-reverse",
          },
          mt: 10,
        }}
      >
        <Box sx={{ flex: { xs: "none", md: 1 } }}>
          <LottiePlayer animationData={animation} adjustSize={0.7} />
        </Box>
        <Box
          sx={{
            flex: { xs: "none", md: 1 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "80%" }}>
            <StyledTypography
              sx={{
                mb: "15px",
                fontSize: {
                  xs: "27px",
                  md: "40px",
                },
              }}
            >
              {header2}
            </StyledTypography>
            <StyledTypography
              sx={{
                textAlign: "left",
                fontSize: {
                  xs: "12px",
                  md: "17px",
                },
              }}
            >
              {description}
            </StyledTypography>
          </Box>
        </Box>
      </Box>
    </Section>
  );
};

const StyledTypography = styled(Typography)({
  color: "#fff",
  textAlign: "center",
  fontFamily: "Inter",
});

export default IntroScreen;
