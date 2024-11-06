import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Detail from "./pages/detail";
import Header from "./components/Header";
import Footer from "./components/footer";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
      <Footer />
    </div>
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
