import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import countImg from "../assets/desktop-design-detail-dark.jpg";
import styles from "../App.module.css";

const Detail = () => {
  return (
    <div>
      <Link to="/">
        <FontAwesomeIcon icon={faArrowLeft} />
        back
      </Link>
      <div className={styles.country_details}>
        <img src={countImg} alt="country flag" />
        <div>
          <h3>Germany</h3>
          <div className={styles.details}>
          <p>
            <strong>Native Name</strong>:<span>Belige</span>
          </p>
          <p>
            <strong>Population</strong>:<span>81,770,900</span>
          </p>
          <p>
            <strong>Region</strong>:<span>Europe</span>
          </p>

          <p>
            <strong>Sub Region</strong>:<span>Western Europe</span>
          </p>
          <p>
            <strong>Capital</strong>:<span>Berlin</span>
          </p>
          <p>
            <strong>Top Level Domain</strong>:<span>Be</span>
          </p>
          <p>
            <strong>Currencies</strong>:<span>Euro</span>
          </p>
          <p>
            <strong>Languages</strong>:<span>Fernch, German, Dutch</span>
          </p>
          </div>
   
        </div>
      </div>
    </div>
  );
};

export default Detail;
