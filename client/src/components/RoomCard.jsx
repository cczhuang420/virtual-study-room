import { Box, Typography } from "@mui/material";
import personAmountIcon from "../assets/room-personAmount-icon.svg";
import { useState } from "react";

const RoomCard = ({
  title,
  showPeopleAmount = true,
  image,
  amount,
  showVagueBackground = true,
  onClick,
}) => {
  const [vagueHeight, setVagueHeight] = useState("50%");
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      onClick={onClick}
      onMouseEnter={() => {
        setVagueHeight("100%");
      }}
      onMouseLeave={() => {
        setVagueHeight("50%");
      }}
      sx={{
        height: "100%",
        width: "100%",
        borderRadius: "13px",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      {showVagueBackground && (
        <Box
          height={`${vagueHeight}`}
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          position={"relative"}
          sx={{
            background: "rgba(255, 255, 255, .3)",
            backdropFilter: "blur(5px)",
          }}
        >
          <Box alignSelf={"center"}>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: "600",
                fontSize: "calc(130%)",
                textAlign: "center",
              }}
            >
              {title}
            </Typography>
          </Box>

          {showPeopleAmount && (
            <Box
              display={"flex"}
              sx={{
                position: "absolute",
                bottom: "2px",
                right: "10px",
              }}
            >
              <Box>
                <img src={personAmountIcon} height={"60%"} />
              </Box>
              <Box
                sx={{
                  color: "#fff",
                  fontWeight: 550,
                  fontSize: "calc(100%)",
                  ml: 0.3,
                }}
              >
                <Typography>{amount}</Typography>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default RoomCard;
