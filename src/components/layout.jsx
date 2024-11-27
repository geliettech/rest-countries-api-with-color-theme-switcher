import React from "react";
import Header from "./header";
import Footer from "./footer";
import { useDarkMode } from "./DarkModeContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CssBaseline,
  Paper,
  Typography,
} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";

const Layout = ({ children }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper style={{ padding: 16, textAlign: "center" }}>
        <Typography variant="h1" gutterBottom>
        Where in the world?
         
          {/* <Header /> */}
          {/* <Button onClick={toggleDarkMode} variant="contained" color="primary">
          Dark Mode
        </Button> */}
        </Typography>
        <Button onClick={toggleDarkMode} variant="contained" color="primary">
            <FontAwesomeIcon icon={faMoon} size="lg" />
            Dark Mode
          </Button>
      </Paper>
      {children}
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
