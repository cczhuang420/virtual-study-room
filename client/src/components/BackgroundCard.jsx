import { useState } from "react";
import { Box } from "@mui/material";
import Checkmark from "../assets/checkmark.svg";

export default function BackgroundCard({ image, isSelectable }) {
  const [selected, setSelected] = useState(false);

  return (
    <Box
      sx={{
        borderRadius: "0.4vw",
        position: "relative",
        cursor: isSelectable ? "pointer" : "default",

        "&:hover": {
          backgroundColor: isSelectable ? "#401f6a" : "transparent",
          opacity: isSelectable ? 0.5 : 1,
        },
      }}
      onClick={() => {
        if (isSelectable) {
          setSelected(!selected);
        }
      }}
    >
      <img
        height={"100%"}
        width={"100%"}
        src={image}
        draggable={false}
        style={{ objectFit: "cover" }}
      />
      {isSelectable && selected && (
        <Box
          height={"98%"}
          width={"100%"}
          sx={{
            backgroundColor: "white",
            opacity: 0.5,
            position: "absolute",
            top: 0,
            left: 0,
            borderRadius: "0.7vw",
          }}
        >
          <Box
            height={"100%"}
            width={"100%"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={Checkmark}
              height={"50%"}
              width={"50%"}
              draggable={false}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
