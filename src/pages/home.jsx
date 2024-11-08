import React from "react";
import styles from "../App.module.css";
import { Link } from "react-router-dom";
import countImg from "../assets/desktop-design-detail-dark.jpg";

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.search_dropdown}>
        <div className={styles.search}>
          <input
            type="search"
            name=""
            id=""
            placeholder="Search a for country"
          />
        </div>
        <div className={styles.dropdown}>
          <select name="regions" id="region-select">
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="America">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>
      <div className={styles.countries}>
        <div className={styles.country}>
          <Link to="/detail">
            <img
              src={countImg}
              alt="country flag"
              className={styles.country_flag}
            />
            <h3>Germany</h3>
            <p>
              <strong>Population</strong>:<span>81,770,900</span>
            </p>
            <p>
              <strong>Region</strong>:<span>Europe</span>
            </p>
            <p>
              <strong>Capital</strong>:<span>Berlin</span>
            </p>
          </Link>
        </div>
        <div className={styles.country}>
          <Link to="/detail">
            <img
              src={countImg}
              alt="country flag"
              className={styles.country_flag}
            />
            <h3>Germany</h3>
            <p>
              <strong>Population</strong>:<span>81,770,900</span>
            </p>
            <p>
              <strong>Region</strong>:<span>Europe</span>
            </p>
            <p>
              <strong>Capital</strong>:<span>Berlin</span>
            </p>
          </Link>
        </div>
        <div className={styles.country}>
          <Link to="/detail">
            <img
              src={countImg}
              alt="country flag"
              className={styles.country_flag}
            />
            <h3>Germany</h3>
            <p>
              <strong>Population</strong>:<span>81,770,900</span>
            </p>
            <p>
              <strong>Region</strong>:<span>Europe</span>
            </p>
            <p>
              <strong>Capital</strong>:<span>Berlin</span>
            </p>
          </Link>
        </div>
        <div className={styles.country}>
          <Link to="/detail">
            <img
              src={countImg}
              alt="country flag"
              className={styles.country_flag}
            />
            <h3>Germany</h3>
            <p>
              <strong>Population</strong>:<span>81,770,900</span>
            </p>
            <p>
              <strong>Region</strong>:<span>Europe</span>
            </p>
            <p>
              <strong>Capital</strong>:<span>Berlin</span>
            </p>
          </Link>
        </div>
        <div className={styles.country}>
          <Link to="/detail">
            <img
              src={countImg}
              alt="country flag"
              className={styles.country_flag}
            />
            <h3>Germany</h3>
            <p>
              <strong>Population</strong>:<span>81,770,900</span>
            </p>
            <p>
              <strong>Region</strong>:<span>Europe</span>
            </p>
            <p>
              <strong>Capital</strong>:<span>Berlin</span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
