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
    },
    typography: {
      fontFamily: '"Nunito Sans", serif',
      fontWeightLight: 300,
      fontWeightMedium: 600,
      fontWeightBold: 800,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode
              ? "hsl(209, 23%, 22%)"
              : "hsl(0, 0%, 100%)",
            borderRadius: "4px",
            "& .MuiInputBase-root": {
              color: darkMode ? "hsl(0, 0%, 100%)" : "hsl(200, 15%, 8%)",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
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
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: darkMode
            ? "hsl(0, 0%, 100%)"
            : "0px 0px 5px hsl(209, 23%, 22%, 0.2)",
        }}
      >
        <Toolbar
          sx={{
            width: { xs: "80%", sm: "88%" },
            padding: "20px 0",
            margin: "auto",
          }}
        >
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
      <Box
        sx={{
          minHeight: "100vh",
          width: { xs: "100%", sm: "90%" },
          margin: "auto",
          padding: { xs: 4, sm: 4, md: 4 },
        }}
      >
        {children}
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
