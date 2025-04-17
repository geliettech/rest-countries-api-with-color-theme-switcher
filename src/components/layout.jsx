// Import React and necessary components
import React from "react";
import Footer from "./footer";
import { useDarkMode } from "./DarkModeContext"; // Custom hook for dark mode state
import { ThemeProvider, createTheme } from "@mui/material/styles"; // MUI theming

// Import MUI components
import {
  AppBar,
  Button,
  CssBaseline,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";

// Import moon icons from react-icons
import { BsMoon, BsMoonFill } from "react-icons/bs";

// Layout component accepts children and an optional layoutClassName prop
const Layout = ({ children, layoutClassName }) => {
  // Destructure dark mode state and toggle function from context
  const { darkMode, toggleDarkMode } = useDarkMode();

  // Define custom MUI theme based on darkMode value
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light", // Set MUI's color mode
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
      fontSizeSmall: "14px",
      fontSizeMedium: "16px",
    },
    boxShadow: darkMode
      ? "hsl(0, 0%, 100%, 0.1)"
      : "0px 0px 5px hsl(209, 23%, 22%, 0.1)",

    // Component-level overrides
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none", // Remove outline borders on inputs
            },
          },
        },
      },
    },
  });

  return (
    // Wrap app in ThemeProvider to apply custom theme
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalize base CSS for consistent styling */}

      {/* AppBar header */}
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
          {/* App title */}
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

          {/* Dark mode toggle button */}
          <Button
            onClick={toggleDarkMode}
            sx={{
              color: theme.palette.text.primary,
              display: "flex",
              alignItems: "center",
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            {/* Icon switches depending on mode */}
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

      {/* Main content area */}
      <Box
        sx={{
          minHeight: "100vh",
          width: { xs: "100%", sm: "90%" },
          margin: "auto",
          padding: { xs: 4, sm: 4, md: 6 },
        }}
        className={layoutClassName}
      >
        {children} {/* Render any children passed to the Layout */}
      </Box>

      {/* Footer at the bottom */}
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
