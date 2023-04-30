import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme.js";
import AuthProvider from "./providers/AuthProvider.jsx";
import SocketProvider from "./providers/SocketProvider.jsx";
import NotificationProvider from "./providers/NotificationProvider.jsx";
import CheckoutModalProvider from "./providers/CheckoutModalProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <SocketProvider>
          <NotificationProvider>
            <CheckoutModalProvider>
              <App />
            </CheckoutModalProvider>
          </NotificationProvider>
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);
