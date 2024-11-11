import React from "react";
import styles from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import CountryDetails from "./pages/countryDetails";
import Layout from "./components/layout";

const App = () => {
  // const [isDarkMode, setIsDarkMode] = useState(false);

  // // Apply dark mode styles to the body element
  // useEffect(() => {
  //   if (isDarkMode) {
  //     document.body.classList.add('dark-mode');
  //     document.body.classList.remove('light-mode');
  //   } else {
  //     document.body.classList.add('light-mode');
  //     document.body.classList.remove('dark-mode');
  //   }
  // }, [isDarkMode]);

  // const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <Layout className={styles.App}>
      <BrowserRouter>
      {/* <ThemeToggle toggleTheme={toggleTheme} isDarkMode={isDarkMode} /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:numericCode" element={<CountryDetails />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
};

export default App;
// https://mui.com/material-ui/customization/dark-mode/
// Your users should be able to:

// - See all countries from the API on the homepage
// - Search for a country using an `input` field
// - Filter countries by region
// - Click on a country to see more detailed information on a separate page
// - Click through to the border countries on the detail page
// - Toggle the color scheme between light and dark mode *(optional)*
