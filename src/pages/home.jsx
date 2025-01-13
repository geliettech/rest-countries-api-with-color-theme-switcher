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
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: "box-shadow: 0px 0px 5px hsl(209, 23%, 22%, 0.2);",
                    overflow: "hidden",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  <Link
                    to={`/country/${country.numericCode}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <CardMedia
                      sx={{ height: 160 }}
                      image={country.flags.png}
                      title={country.name}
                    />
                    <CardContent sx={{ padding: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          marginBottom: 1.5,
                          fontSize: "18px",
                        }}
                      >
                        {country.name}
                      </Typography>
                      <Typography variant="body2" component="div">
                        <Typography
                          component="div"
                          sx={{ marginBottom: 0.5, fontSize: "14px" }}
                        >
                          <strong style={{ fontWeight: 600 }}>
                            Population:{" "}
                          </strong>
                          <span style={{ fontWeight: 300 }}>
                            {country.population.toLocaleString()}
                          </span>
                        </Typography>
                        <Typography
                          component="div"
                          sx={{ marginBottom: 0.5, fontSize: "14px" }}
                        >
                          <strong style={{ fontWeight: 600 }}>Region: </strong>
                          <span style={{ fontWeight: 300 }}>
                            {country.region}
                          </span>
                        </Typography>
                        <Typography
                          component="div"
                          sx={{ marginBottom: 0.5, fontSize: "14px" }}
                        >
                          <strong style={{ fontWeight: 600 }}>Capital: </strong>
                          <span style={{ fontWeight: 300 }}>
                            {country.capital}
                          </span>
                        </Typography>
                      </Typography>
                    </CardContent>
                  </Link>
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
