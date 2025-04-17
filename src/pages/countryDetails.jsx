// Import necessary modules and components
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // For routing and parameter extraction
import Layout from "../components/layout"; // Custom layout component
import { CardMedia, Box, Button, Typography, Grid, Alert } from "@mui/material"; // Material UI components
import { FaArrowLeftLong } from "react-icons/fa6"; // Left arrow icon from react-icons
import axios from "axios"; // HTTP request library
import CircularIndeterminate from "../components/loader"; // Custom loading spinner component
import styles from "../styles/countryDetails.module.css"; // Custom CSS module for styling

// CountryDetails component function
const CountryDetails = () => {
  // Extract numericCode parameter from the URL
  const { numericCode } = useParams();

  // State variables to store data and loading/error states
  const [country, setCountry] = useState(null); // Country data
  const [loading, setLoading] = useState(true); // Loading state
  const [borderCountries, setBorderCountries] = useState([]); // List of border countries
  const [error, setError] = useState(false); // Error state

  // useEffect hook to fetch data on component mount or numericCode change
  useEffect(() => {
    // Fetch country data from the API
    axios
      .get("https://restcountries.com/v2/all") // Fetch all countries data
      .then((response) => {
        // Find the country matching the numericCode
        const countryData = response.data.find(
          (c) => c.numericCode === numericCode
        );

        // If country data is found
        if (countryData) {
          setError(false); // Reset error
          setCountry(countryData); // Set country data

          // If the country has borders, fetch the details of border countries
          if (countryData.borders) {
            const borderData = countryData.borders
              .map((borderCode) =>
                response.data.find((c) => c.alpha3Code === borderCode)
              )
              .filter((c) => c); // Remove undefined values
            setBorderCountries(borderData); // Set border countries
          }
        } else {
          throw new Error("Country not found"); // Handle case where country is not found
        }
      })
      .catch((err) => {
        console.error("Error fetching country details:", err); // Log error
        setError(`Failed to fetch country details. Please try again later.`); // Set error message
      })
      .finally(() => {
        setLoading(false); // Set loading to false after data fetch is complete
      });
  }, [numericCode]); // Dependency array ensures this runs when numericCode changes

  // Render component JSX
  return (
    <Layout layoutClassName={styles.countryDetails}>
      {/* Back button to navigate to the homepage */}
      <Button
        component={Link}
        to="/"
        sx={(theme) => ({
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.boxShadow,
          mb: 8,
          mt: 3,
          padding: "8px 28px",
          borderRadius: "6px",
          "&:hover": {
            textDecoration: "underline",
          },
        })}
      >
        <FaArrowLeftLong />
        <Typography
          component="span"
          sx={{
            marginLeft: "6px",
            textTransform: "capitalize",
            fontSize: { xs: "12px", sm: "14px" },
          }}
        >
          back
        </Typography>
      </Button>

      {/* Display error message if error state is true */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* If loading is true, show loading spinner */}
      {loading ? (
        <CircularIndeterminate />
      ) : (
        // If data is fetched successfully, display country details
        country && (
          <Grid
            container
            spacing={4}
            alignItems="center"
            columnSpacing={{ xs: 1, sm: 2, md: 10 }}
          >
            {/* Flag Section */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{ height: { xs: 200, sm: 300, md: 400 } }}
            >
              <CardMedia
                component="img"
                image={country.flags.svg}
                alt={`${country.name} flag`}
                sx={{ height: "100%", objectFit: "cover" }}
              />
            </Grid>

            {/* Country Details Section */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h5"
                sx={(theme) => ({
                  fontWeight: theme.typography.fontWeightBold,
                  lineHeight: 3,
                })}
                gutterBottom
              >
                {country.name} {/* Display country name */}
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  {/* Display various country details */}
                  <Typography className={styles.country_details}>
                    <strong>Native Name: </strong>
                    <span>{country.nativeName || "N/A"}</span>
                  </Typography>
                  <Typography className={styles.country_details}>
                    <strong>Population: </strong>
                    <span>
                      {country.population
                        ? country.population.toLocaleString()
                        : "N/A"}
                    </span>
                  </Typography>
                  <Typography className={styles.country_details}>
                    <strong>Region: </strong>
                    <span>{country.region || "N/A"}</span>
                  </Typography>
                  <Typography className={styles.country_details}>
                    <strong>Sub Region: </strong>
                    <span>{country.subregion || "N/A"}</span>
                  </Typography>
                  <Typography className={styles.country_details}>
                    <strong>Capital: </strong>
                    <span>{country.capital || "N/A"}</span>
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  {/* Display other country details */}
                  <Typography className={styles.country_details}>
                    <strong>Top Level Domain: </strong>
                    <span>
                      {country.topLevelDomain
                        ? country.topLevelDomain.join(", ")
                        : "N/A"}
                    </span>
                  </Typography>
                  <Typography className={styles.country_details}>
                    <strong>Currencies: </strong>
                    <span>
                      {country.currencies
                        ? country.currencies
                            .map((currency) => currency.name)
                            .join(", ")
                        : "N/A"}
                    </span>
                  </Typography>
                  <Typography className={styles.country_details}>
                    <strong>Languages: </strong>
                    <span>
                      {country.languages
                        ? country.languages
                            .map((language) => language.name)
                            .join(", ")
                        : "N/A"}
                    </span>
                  </Typography>
                </Grid>
              </Grid>

              {/* Border Countries Section */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: { xs: "wrap", sm: "wrap", md: "nowrap" },
                  alignItems: "center",
                  gap: 1,
                  mt: 4,
                }}
              >
                <Typography
                  variant="h6"
                  sx={(theme) => ({
                    fontWeight: theme.typography.fontWeightMedium,
                    fontSize: theme.typography.fontSizeMedium,
                  })}>
                  Border Countries:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: { xs: "wrap", sm: "wrap", md: "wrap" },
                    gap: 2,
                  }}
                >
                  {/* If there are border countries, display them */}
                  {borderCountries.length > 0 ? (
                    borderCountries.map((borderCountry) => (
                      <Button
                        component={Link}
                        to={`/country/${borderCountry.numericCode}`}
                        key={borderCountry.alpha3Code}
                        sx={(theme) => ({
                          color: theme.palette.text.primary,
                          backgroundColor: theme.palette.background.paper,
                          boxShadow: theme.boxShadow,
                          fontWeight: theme.typography.fontWeightLight,
                          textTransform: "none",
                          borderRadius: "2px",
                          padding: "2px 10px",
                        })}
                      >
                        {borderCountry.name}
                      </Button>
                    ))
                  ) : (
                    // If no border countries, display a disabled button
                    <Button disabled>None</Button>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        )
      )}
    </Layout>
  );
};

export default CountryDetails; // Export the component
