import React from "react";
import "./styles/globals.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import CountryDetails from "./pages/countryDetails";
import { DarkModeProvider } from "./components/DarkModeContext";

const App = () => {
  return (
    <DarkModeProvider className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:numericCode" element={<CountryDetails />} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
};

export default App;
