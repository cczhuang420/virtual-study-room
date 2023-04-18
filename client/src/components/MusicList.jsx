import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@mui/material";
import MusicNote from "../assets/music-note.svg";

export default function MusicList({ musics }) {
  return (
    <Box
      padding={3}
      // sx={{ width: "100%", backgroundColor: "#401f6a", borderRadius: "0.7vw" }}
    >
      <List>
        {musics.map((music, index) => (
          <ListItem key={index} sx={{ padding: 3 }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#9f8fb4",
                borderRadius: "0.5vw",
                padding: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <ListItemIcon>
                  <img src={MusicNote} alt="Music Note" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: "bold", color: "black" }}
                    >
                      {music.name}
                    </Typography>
                  }
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListItemText
                  primary={
                    <Typography variant="h3" sx={{ color: "black" }}>
                      {"By " + music.artist}
                    </Typography>
                  }
                />
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
