import React from "react";
import styles from "../App.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.attribution}> {/* Updated to className */}
        Challenge by
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noopener noreferrer">
          Frontend Mentor
        </a>
        . Coded by
        <a
          href="https://www.frontendmentor.io/profile/oge-dev"
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

export default Footer;
