// DarkModeContext.js

// Import necessary hooks and methods from React
import React, { createContext, useContext, useState } from 'react';

// Create a new context for dark mode
const DarkModeContext = createContext();

// This component provides the dark mode state to all child components
export const DarkModeProvider = ({ children }) => {
  // State to track whether dark mode is enabled (default is false)
  const [darkMode, setDarkMode] = useState(false);

  // Function to toggle between dark mode and light mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode); // Toggle the current mode
  };

  // Provide the darkMode value and toggle function to child components
  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Custom hook to allow easy access to the dark mode context
export const useDarkMode = () => {
  return useContext(DarkModeContext);
};
