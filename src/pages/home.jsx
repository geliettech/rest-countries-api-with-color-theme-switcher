import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../App.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("All"); // State to store selected region

  useEffect(() => {
    axios
      .get("../../data.json")
      .then((response) => {
        // On successful response, update countries state and reset error
        setCountries(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        // On error, log it and update error state
        console.error("Error fetching countries:", error);
      })
      .finally(() => {
        // Finally, set loading to false
        setLoading(false);
      });
  }, []);

  // Filter countries based on search term and region
  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRegion = region === "All" || country.region === region;
    return matchesSearch && matchesRegion;
  });

  if (loading) {
    return <p>Loading countries...</p>;
  }

  return (
    <div className={styles.home}>
      <div className={styles.searchInput_selectOption}>
        <input
          type="search"
          name=""
          id=""
          placeholder="Search a for country"
          onChange={(event) => setSearchTerm(event.target.value)}
          value={searchTerm}
          className={styles.searchInput}
        />
        <select
          value={region}
          onChange={(event) => setRegion(event.target.value)}
          className={styles.selectOption}
        >
          <option value="All" disabled>
            Filter by Regioin
          </option>
          <option value="Africa">Africa</option>
          <option value="Americas">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div className={styles.countries}>
        {filteredCountries.map((country) => (
          <Link
            to={`/country/${country.numericCode}`}
            className={styles.country}
            key={country.numericCode}
          >
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
        ))}
      </div>
    </div>
  );
};

export default Home;
