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

const MyApp = ({ children }) => {
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
        <Typography variant="h4" gutterBottom>
        <Header />
        </Typography>
        <Button onClick={toggleDarkMode} variant="contained" color="primary">
          Toggle Dark Mode
        </Button>
      </Paper>
      {children}
      <Footer />
    </ThemeProvider>
  );
};

export default MyApp;
