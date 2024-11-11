// ThemeToggle.js
import React from 'react';

const ThemeToggle = ({ toggleTheme, isDarkMode }) => {
  return (
    <button onClick={toggleTheme} style={{ padding: '10px', marginTop: '20px' }}>
      Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
    </button>
  );
};

export default ThemeToggle;
