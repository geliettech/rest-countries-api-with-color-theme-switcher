// Importing necessary dependencies from React and other packages
import React from "react";
import "./styles/globals.css"; // Importing global styles for the application
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Importing routing components from react-router-dom
import Home from "./pages/home"; // Importing Home component
import CountryDetails from "./pages/countryDetails"; // Importing CountryDetails component
import { DarkModeProvider } from "./components/DarkModeContext"; // Importing the DarkModeProvider to manage dark mode state

// Main App component
const App = () => {
  return (
    // Wrapping the entire application in the DarkModeProvider to provide dark mode context to all components
    <DarkModeProvider className="App">
      {/* BrowserRouter component is used to enable routing in the application */}
      <BrowserRouter>
        {/* Routes component is used to define all the routes in the app */}
        <Routes>
          {/* Defining the root route ("/") to render the Home component */}
          <Route path="/" element={<Home />} />
          
          {/* Defining a route for the CountryDetails page. The route includes a dynamic parameter 'numericCode' */}
          <Route path="/country/:numericCode" element={<CountryDetails />} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
};

// Exporting the App component to use in other parts of the application
export default App;
