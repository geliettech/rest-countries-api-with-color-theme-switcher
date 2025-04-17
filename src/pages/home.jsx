// Import necessary modules and components
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
  Alert, // Import Alert for error handling
} from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  // State hooks to manage country data, loading state, search input, selected region, and error handling
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("All");
  const [error, setError] = useState(false); // State for error handling

  // useEffect to fetch country data from the API when the component is mounted
  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all")
      .then((response) => {
        setError(false); // Clear any previous error
        setCountries(response.data); // Store fetched countries data
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        // Set error message if fetching fails
        setError(
          `Failed to fetch countries: ${error.message}. Please try again later.`
        );
      })
      .finally(() => {
        setLoading(false); // Set loading state to false after data is fetched
      });
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // Filter countries based on search term and selected region
  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase()); // Filter by country name based on search term
    const matchesRegion = region === "All" || country.region === region; // Filter by region if selected
    return matchesSearch && matchesRegion; // Return countries that match both criteria
  });

  return (
    <Layout layoutClassName={styles.home}>
      {/* Search and Filter Section */}
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
          {/* Search Input Field */}
          <TextField
            search="true"
            variant="outlined"
            placeholder="Search for a country..."
            fullWidth
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            value={searchTerm}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IoMdSearch className={styles.selectOption} /> {/* Search icon */}
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        {/* Region Filter Dropdown */}
        <TextField
          select
          value={region}
          onChange={(e) => setRegion(e.target.value)} // Update selected region
          variant="outlined"
          sx={(theme) => ({
            boxShadow: theme.boxShadow,
            backgroundColor: theme.palette.background.paper,
          })}
          className={styles.selectOption}
        >
          {/* Region options */}
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

      {/* Show loading indicator while data is being fetched */}
      {loading ? (
        <CircularIndeterminate />
      ) : (
        // Render country data in cards
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
                  to={`/country/${country.numericCode}`} // Link to country details page
                  className={styles.countries_link}
                >
                  {/* Country Flag */}
                  <CardMedia
                    sx={{ height: 160 }}
                    image={country.flags.png}
                    title={country.name}
                  />
                  <CardContent sx={{ padding: 2 }}>
                    {/* Country Name */}
                    <Typography
                      variant="h6"
                      sx={(theme) => ({
                        fontWeight: theme.typography.fontWeightBold,
                        mb: 1,
                      })}
                    >
                      {country.name}
                    </Typography>
                    {/* Country Population */}
                    <Typography
                      variant="body2"
                      sx={{ mb: 0.5 }}
                      className={styles.country_detail}
                    >
                      <strong>Population: </strong>
                      <span>{country.population.toLocaleString()}</span>
                    </Typography>
                    {/* Country Region */}
                    <Typography
                      variant="body2"
                      sx={{ mb: 0.5 }}
                      className={styles.country_detail}
                    >
                      <strong>Region: </strong>
                      <span>{country.region}</span>
                    </Typography>
                    {/* Country Capital */}
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
