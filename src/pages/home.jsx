import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import axios from "axios";
import styles from "../styles/home.module.css";
import { IoMdSearch } from "react-icons/io";
import CircularIndeterminate from "../components/loader";
import {
  Grid,
  Card,
  Box,
  TextField,
  MenuItem,
  CardContent,
  CardMedia,
  Typography,
  InputAdornment,
  Alert, // Import Alert
} from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("All");
  const [error, setError] = useState(false); // State for error handling

  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all")
      .then((response) => {
        setError(false);
        setCountries(response.data);
        // setError(false);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setError(
          `Failed to fetch countries: ${error.message}. Please try again later.`
        ); // Set error message
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
    <Layout layoutClassName={styles.home}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: { xs: 4, sm: 4, md: 6 },
          flexWrap: "wrap",
          gap: 4,
        }}
      >
        <Box
          sx={(theme) => ({
            boxShadow: theme.boxShadow,
            backgroundColor: theme.palette.background.paper,
          })}
          className={styles.SearchInput_Wrapper}
        >
          {/* Search Input */}
          <TextField
            search="true"
            variant="outlined"
            placeholder="Search for a country..."
            fullWidth
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IoMdSearch className={styles.selectOption} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {/* Filter Dropdown */}
        <TextField
          select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          variant="outlined"
          sx={(theme) => ({
            boxShadow: theme.boxShadow,
            backgroundColor: theme.palette.background.paper,
          })}
          className={styles.selectOption}
        >
          <MenuItem value="All">Filter by Region</MenuItem>
          <MenuItem value="Africa">Africa</MenuItem>
          <MenuItem value="Americas">Americas</MenuItem>
          <MenuItem value="Asia">Asia</MenuItem>
          <MenuItem value="Europe">Europe</MenuItem>
          <MenuItem value="Oceania">Oceania</MenuItem>
        </TextField>
      </Box>

      {/* Show error message if there is an error */}
      {error && (
        <Alert severity="error" sx={{ mt: 6 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <CircularIndeterminate />
      ) : (
        <Grid container spacing={8}>
          {filteredCountries.map((country) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={country.numericCode}>
              <Card
                sx={(theme) => ({
                  boxShadow: theme.boxShadow,
                })}
                className={styles.country_cards}
              >
                <Link
                  to={`/country/${country.numericCode}`}
                  className={styles.countries_link}
                >
                  <CardMedia
                    sx={{ height: 160 }}
                    image={country.flags.png}
                    title={country.name}
                  />
                  <CardContent sx={{ padding: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                      {country.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mb: 0.5 }}
                      className={styles.country_detail}
                    >
                      <strong>Population: </strong>
                      <span>{country.population.toLocaleString()}</span>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mb: 0.5 }}
                      className={styles.country_detail}
                    >
                      <strong>Region: </strong>
                      <span>{country.region}</span>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mb: 0.5 }}
                      className={styles.country_detail}
                    >
                      <strong>Capital: </strong>
                      <span>{country.capital}</span>
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Layout>
  );
};

export default Home;
