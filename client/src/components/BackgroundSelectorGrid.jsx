import { useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import BackgroundCard from "./BackgroundCard";

export default function BackgroundSelectorGrid({ images, onClick }) {
  const [backgroundSelectedArray, setBackgroundSelectedArray] = useState(
    images.map((_, i) => i === 0)
  );

  const handleBackgroundOnClick = (index) => {
    setBackgroundSelectedArray(new Array(images.length).fill(false));

    setBackgroundSelectedArray((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });

    if (backgroundSelectedArray[index]) {
      return;
    }

    onClick(images[index]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "1vw",
        borderRadius: "0.7vw",
      }}
    >
      <Box
        mb={"2vw"}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.5vw",
            fontWeight: "bold",
            color: "white",
            marginRight: "2vw",
          }}
        >
          Choose your background
        </Typography>
        <Typography
          sx={{
            fontSize: "1.2vw",
            color: "#9783b0",
            cursor: "pointer",
          }}
        >
          Browse more
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Grid container spacing={3}>
          {images.map((image, index) => (
            <Grid key={index} item xs={12} sm={4} mb={3}>
              <BackgroundCard
                image={image}
                isSelectable={true}
                isSelected={backgroundSelectedArray[index]}
                onClick={() => handleBackgroundOnClick(index)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
