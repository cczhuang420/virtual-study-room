import { Grid, Avatar } from "@mui/material";

export default function ProfileGrid({ images }) {
  return (
    // Grid display of Avatars with round corners and there are 5 columns
    <Grid
      container
      padding={3}
      spacing={3}
      sx={{ backgroundColor: "#401f6a", borderRadius: "0.7vw" }}
    >
      {images.map((image, index) => (
        <Grid key={index} item xs={12} sm={3}>
          <Avatar
            alt="Profile Image"
            src={image}
            sx={{ borderRadius: "50%" }}
          />
        </Grid>
      ))}
    </Grid>
  );
}
