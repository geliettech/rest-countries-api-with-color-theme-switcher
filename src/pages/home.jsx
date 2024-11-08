import React from "react";
import styles from "../App.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Make a GET request to fetch movie data from the API
    axios
      .get("../../data.json")
      .then((response) => {
        // On successful response, update movies state and reset error
        setCountries(response.data);
        console.log(response.data);
        setError(null);
      })
      .catch((error) => {
        // On error, log it and update error state
        console.error("Error fetching movies:", error);
        setError(error.message);
        setCountries([]);
      })
      .finally(() => {
        // Finally, set loading to false
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data!</p>;

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
        {countries.map((country, index) => (
          <div className={styles.country} key={index}>
            <Link to={`/country/${index}`}>
              <img src={country.flags.png} alt="country flag" />
              <h3>{country.name}</h3>
              <p>
                <strong>Population</strong>:<span>{country.population}</span>
              </p>
              <p>
                <strong>Region</strong>:<span>{country.region}</span>
              </p>
              <p>                          
                <strong>Capital</strong>:<span>{country.capital}</span>
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
// https://github.com/oge-dev/Profile-Search-App/blob/main/src/Components/UserProfileSearch/UserProfile.jsx