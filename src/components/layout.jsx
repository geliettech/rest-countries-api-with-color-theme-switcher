import React from "react";
import Footer from "./footer";
import { useDarkMode } from "./DarkModeContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  AppBar,
  Button,
  CssBaseline,
  Paper,
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
      typography: {
        fontFamily: '"Nunito Sans", serif',
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
        }}
      >
        <Toolbar sx={{ width: "94%",  margin: "auto"}}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 800,
              fontFamily: theme.palette.typography.fontFamily,
            }}
          >
            Where in the world?
          </Typography>
          <Button
            color="inherit"
            onClick={toggleDarkMode}
            sx={{ fontFamily: theme.palette.typography.fontFamily }}
          >
            {darkMode ? <BsMoonFill /> : <BsMoon />}
            <span style={{ marginLeft: "6px" }}>Dark Mode</span>
          </Button>
        </Toolbar>
      </AppBar>
      <div>{children}</div>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
// https://mui.com/store/collections/how-to-create-a-personal-website-with-react-material-ui/?srsltid=AfmBOoqoBwJiaVnhcr4gSbCkGOdhfz0elraLVwf0vSAWnp5OaHnPirly
