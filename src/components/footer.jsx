// Import React library
import React from "react";

// Import global CSS styles
import "../styles/globals.css";

// Define the Footer functional component
const Footer = () => {
  return (
    // Footer HTML element with a class name for styling
    <footer className="footer">
      {/* Attribution text inside a div */}
      <div className="attribution">
        {/* Link to Frontend Mentor challenge */}
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank" // Opens link in a new tab
          rel="noopener noreferrer" // Security feature to prevent access to window.opener
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        {/* Link to your Frontend Mentor profile */}
        <a
          href="https://www.frontendmentor.io/profile/geliettech"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ogechi Juliet Uhegbu
        </a>
        .
      </div>
    </footer>
  );
};

// Export the Footer component so it can be used in other parts of the app
export default Footer;
