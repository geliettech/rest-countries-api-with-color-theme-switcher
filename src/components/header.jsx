import React from "react";
import styles from "../App.module.css";
import { Link } from "react-router-dom";
import { IoMoonOutline } from "react-icons/io5";


const Header = () => {
  return (
    <div className={styles.header}>
      <h1 className="title">Where in the world?</h1>
      <div className="darkmode">
        <span>
          {/* <i class="fa fa-moon-o" aria-hidden="true"></i> */}
          Your <FontAwesomeIcon icon="coffee" /> is hot and ready!
        </span>
        <span>darkmode</span>
      </div>
    </div>
  );
};

export default Header;
