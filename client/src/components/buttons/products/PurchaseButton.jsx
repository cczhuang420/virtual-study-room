import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import { useCallback } from "react";
import { useModal } from "../../../App.jsx";

const PurchaseButton = ({ title, type, image, cost }) => {
  const { handleOpen, setContent } = useModal();
  const ColorButton = styled(Button)(() => ({
    backgroundColor: "#9B84B4",
    textTransform: "unset !important",
    fontSize: 14,
    fontFamily: "Rubik",
    "&:hover": {
      opacity: "0.9",
      backgroundColor: "#9B84B4",
      transform: "scale(1.05)",
    },
  }));

  const handleClick = useCallback(() => {
    setContent({
      title: "Check out",
      imageTitle: `purchase "${title}" now`,
      image: image,
      cost: cost,
      money: 1289,
      type: type,
      onClick: () => {
        console.log("hahahaha");
      },
    });
    handleOpen();
  }, []);

  return (
    <ColorButton size="small" onClick={handleClick}>
      Purchase
    </ColorButton>
  );
};

export default PurchaseButton;
