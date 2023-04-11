import { Grid } from "@mui/material";
import BackgroundCard from "./BackgroundCard";

export default function BackgroundGrid({ images }) {
  return (
    <Grid
      container
      padding={3}
      spacing={3}
      sx={{ backgroundColor: "#401f6a", borderRadius: "0.7vw" }}
    >
      {images.map((image, index) => (
        <Grid key={index} item xs={12} sm={4} mb={3}>
          <BackgroundCard image={image} isSelectable={false} />
        </Grid>
      ))}
    </Grid>
  );
}
