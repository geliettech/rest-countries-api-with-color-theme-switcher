import React from "react";
import styles from "../App.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";

const Header = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Where in the world?</h1>
      <div className={styles.darkmode}>
        <span>
          <FontAwesomeIcon icon={faMoon} size="lg" />
        </span>
        <span>Dark Mode</span>
      </div>
    </div>
  );
};

export default Header;
