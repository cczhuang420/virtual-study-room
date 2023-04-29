import { createContext, useCallback, useContext, useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const context = createContext(() => {});

const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const notify = useCallback(
    (message) => {
      setMessage(message);
      setOpen(true);
    },
    [setOpen, setMessage]
  );

  return (
    <context.Provider value={notify}>
      {children}
      <Snackbar
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "#fff",
            color: "#000",
          },
        }}
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(false);
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={message}
        action={
          <IconButton
            size="medium"
            color="inherit"
            onClick={() => setOpen(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </context.Provider>
  );
};

export default NotificationProvider;

export const useNotification = () => useContext(context);
