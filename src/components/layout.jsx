import React from "react";
import Footer from "./footer";
import { useDarkMode } from "./DarkModeContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  AppBar,
  Button,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import { BsMoon, BsMoonFill } from "react-icons/bs";

const Layout = ({ children }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "hsl(207, 26%, 17%)" : "hsl(0, 0%, 98%)",
        paper: darkMode ? "hsl(209, 23%, 22%)" : "hsl(0, 0%, 100%)",
      },
      text: {
        primary: darkMode ? "hsl(0, 0%, 100%)" : "hsl(200, 15%, 8%)",
      },
      action: {
        input: darkMode ? "hsl(0, 0%, 52%)" : "hsl(0, 0%, 52%)",
      },
    },
    typography: {
      fontFamily: '"Nunito Sans", serif',
      fontWeightLight: 300,
      fontWeightMedium: 600,
      fontWeightBold: 800,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: darkMode
            ? "hsl(0, 0%, 100%)"
            : "0px 0px 5px hsl(209, 23%, 22%, 0.2)",
        }}
      >
        <Toolbar sx={{ width: "94%", margin: "auto" }}>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: theme.typography.fontWeightBold,
              fontFamily: theme.typography.fontFamily,
              fontSize: { xs: "14px", sm: "16px", md: "22px" },
            }}
          >
            Where in the world?
          </Typography>
          <Button
            color="inherit"
            onClick={toggleDarkMode}
            sx={{
              fontFamily: theme.typography.fontFamily,
              display: "flex",
              alignItems: "center",
            }}
          >
            {darkMode ? <BsMoonFill /> : <BsMoon />}
            <Typography
              component="span"
              sx={{
                marginLeft: "4px",
                fontWeight: theme.typography.fontWeightMedium,
                textTransform: "capitalize",
                fontSize: { xs: "12px", sm: "14px" },
              }}
            >
              Dark Mode
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ minHeight: "100vh" }}>{children}</div>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
