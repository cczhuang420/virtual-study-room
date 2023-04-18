import { Grid, Avatar } from "@mui/material";

export default function ProfileGrid({ images }) {
  return (
    <Grid container padding={3} spacing={3}>
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
