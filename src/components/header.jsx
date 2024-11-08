import React from "react";
import styles from "../App.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Header = () => {
  return (
    <div className={styles.header}>
      <h1 className="title">Where in the world?</h1>
      <div className="darkmode">
        <span>
          {/* <i class="fa fa-moon-o" aria-hidden="true"></i> */}
          <FontAwesomeIcon icon="check-square" />
        </span>
        <span>darkmode</span>
      </div>
    </div>
  );
};

export default Header;
