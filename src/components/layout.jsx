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
  Box,
} from "@mui/material";
import { BsMoon, BsMoonFill } from "react-icons/bs";

const Layout = ({ children, layoutClassName }) => {
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
      fontSizeHome: "14px",
      fontSizeDetail: "16px",
    },
    boxShadow: darkMode
      ? "hsl(0, 0%, 100%, 0.1)"
      : "0px 0px 5px hsl(209, 23%, 22%, 0.1)",
      components: {
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none", // Removes the border globally for all outlined text fields
              },
            },
          },
        },
      },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.boxShadow,
        }}
      >
        <Toolbar
          sx={{
            padding: "20px 0",
            width: { xs: "80%", sm: "86%" },
            margin: "auto",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: theme.typography.fontWeightBold,
              fontSize: { xs: "14px", sm: "18px", md: "22px" },
            }}
          >
            Where in the world?
          </Typography>
          <Button
            onClick={toggleDarkMode}
            sx={{
              color: theme.palette.text.primary,
              display: "flex",
              alignItems: "center",
            }}
          >
            {darkMode ? <BsMoonFill /> : <BsMoon />}
            <Typography
              sx={{
                textTransform: "capitalize",
                marginLeft: "4px",
                fontWeight: theme.typography.fontWeightMedium,
                fontSize: { xs: "12px", sm: "14px" },
              }}
            >
              Dark Mode
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          minHeight: "100vh",
          width: { xs: "100%", sm: "90%" },
          margin: "auto",
          padding: { xs: 4, sm: 4, md: 6 },
        }}
        className={layoutClassName}
      >
        {children}
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
