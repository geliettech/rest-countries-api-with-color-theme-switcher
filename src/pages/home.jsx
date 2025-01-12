import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/home.module.css";
import { Link } from "react-router-dom";
import Layout from "../components/layout";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { IoMdSearch } from "react-icons/io";
import CircularIndeterminate from "../components/loader";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("All");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRegion = region === "All" || country.region === region;
    return matchesSearch && matchesRegion;
  });

  return (
    <Layout>
      <div className={styles.home}>
        <div className={styles.searchInput_selectOption}>
          <div className={styles.searchInput}>
            <IoMdSearch className={styles.searchIcon} />
            <input
              type="search"
              placeholder="Search for a country"
              onChange={(event) => setSearchTerm(event.target.value)}
              value={searchTerm}
              className={styles.searchInputField}
              aria-label="Search for countries"
            />
          </div>

          <select
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            className={styles.selectOption}
            aria-label="Select region"
          >
            <option value="All" disabled>
              Filter by Region
            </option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
        <div>{loading && <CircularIndeterminate />}</div>
        <div className={styles.countries}>
          {filteredCountries.map((country) => (
            <Card
              sx={{ width: "100%", borderRadius: 3, padding: 1 }}
              key={country.numericCode}
            >
              <CardContent>
                <Link
                  to={`/country/${country.numericCode}`}
                  className={styles.country}
                >
                  <CardMedia
                    sx={{ height: 180, borderRadius: 3 }}
                    image={country.flags.png}
                    title={country.name}
                  />
                  <Typography variant="h4">{country.name}</Typography>

                  <p>
                    <strong>Population</strong>:{" "}
                    <span>{country.population}</span>
                  </p>
                  <p>
                    <strong>Region</strong>: <span>{country.region}</span>
                  </p>
                  <p>
                    <strong>Capital</strong>: <span>{country.capital}</span>
                  </p>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
