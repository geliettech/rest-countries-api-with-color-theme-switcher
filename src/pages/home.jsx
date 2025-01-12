import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import axios from "axios";
import styles from "../styles/home.module.css";
import { IoMdSearch } from "react-icons/io";
import CircularIndeterminate from "../components/loader";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

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
        {loading ? (
          <CircularIndeterminate />
        ) : (
          <Grid container spacing={8}>
            {filteredCountries.map((country) => (
              <Grid item xs={12} sm={6} md={3} key={country.numericCode}>
                <Card>
                  <CardContent>
                    <Link
                      to={`/country/${country.numericCode}`}
                      className={styles.country}
                    >
                      <CardMedia
                        sx={{ height: 180 }}
                        image={country.flags.png}
                        title={country.name}
                      />
                      <Typography variant="h5">{country.name}</Typography>
                      <Typography variant="body2">
                        <p>
                          <strong>Population</strong>:{" "}
                          <span>{country.population}</span>
                        </p>
                        <p>
                          <strong>Region</strong>: <span>{country.region}</span>
                        </p>
                        <p>
                          <strong>Capital</strong>:{" "}
                          <span>{country.capital}</span>
                        </p>
                      </Typography>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </Layout>
  );
};

export default Home;
// https://v5.mui.com/material-ui/react-grid2/
// https://mui.com/material-ui/react-grid/?srsltid=AfmBOooqC2v4Sj6hZgQJg4Wjuh-JXEV19rFtqtcl3Fv-54K40ZpQkkmu