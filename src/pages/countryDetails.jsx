import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/layout";
import { CardMedia, Box, Button, Typography, Grid, Alert } from "@mui/material";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import CircularIndeterminate from "../components/loader";
import styles from "../styles/countryDetails.module.css";

const CountryDetails = () => {
  const { numericCode } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [borderCountries, setBorderCountries] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all")
      .then((response) => {
        const countryData = response.data.find(
          (c) => c.numericCode === numericCode
        );
        setCountry(countryData);

        if (countryData && countryData.borders) {
          const borderData = countryData.borders.map((borderCode) =>
            response.data.find((c) => c.alpha3Code === borderCode)
          );
          setBorderCountries(borderData);
        }
        setError(false);
      })
      .catch((error) => {
        console.error("Error fetching country details:", error);
        setError(
          `Failed to fetch country: ${error.message}. Please try again later.`
        ); // Set error message
      })
      .finally(() => {
        setLoading(false);
        setError(false);
      });
  }, [numericCode]);

  return (
    <Layout layoutClassName={styles.countryDetails}>
        <Button
          component={Link}
          to="/"
          sx={(theme) => ({
            marginTop: 4,
            marginBottom: 7,
            boxShadow: theme.palette.mode === "dark"
              ? "0px 0px 5px hsl(0, 0%, 100%, 0.2)"
              : "0px 0px 5px hsl(209, 23%, 22%, 0.2)",
            padding: "8px 28px",
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          })} >
          <FaArrowLeftLong />  <Typography
              component="span"
              sx={(theme) => ({
                marginLeft: "4px",
                textTransform: "capitalize",
                fontSize: { xs: "12px", sm: "14px" },
                color: theme.palette.text.primary,
              })}
            >
            back
            </Typography>
        </Button>
        {/* Show error message if there is an error */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        {loading ? (
          <CircularIndeterminate />
        ) : (
          <Grid container spacing={4}>
            {/* Flag Section */}
            <Grid item sx={{ height: 400 }} xs={12} md={6}>
              <CardMedia
                image={country.flags.svg}
                alt="Country flag"
                sx={{
                  height: "100%",
                }}
              />
            </Grid>

            {/* Country Details Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {country.name}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography>
                    <strong>Native Name:</strong> {country.nativeName}
                  </Typography>
                  <Typography>
                    <strong>Population:</strong>{" "}
                    {country.population.toLocaleString()}
                  </Typography>
                  <Typography>
                    <strong>Region:</strong> {country.region}
                  </Typography>
                  <Typography>
                    <strong>Sub Region:</strong> {country.subregion}
                  </Typography>
                  <Typography>
                    <strong>Capital:</strong> {country.capital}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography>
                    <strong>Top Level Domain:</strong> {country.topLevelDomain}
                  </Typography>
                  <Typography>
                    <strong>Currencies:</strong>{" "}
                    {country.currencies
                      .map((currency) => currency.name)
                      .join(", ")}
                  </Typography>
                  <Typography>
                    <strong>Languages:</strong>{" "}
                    {country.languages
                      .map((language) => language.name)
                      .join(", ")}
                  </Typography>
                </Grid>
              </Grid>

              {/* Border Countries Section */}
              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  Border Countries:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {borderCountries.length > 0 ? (
                    borderCountries.map((borderCountry) => (
                      <Button
                        component={Link}
                        to={`/country/${borderCountry.numericCode}`}
                        key={borderCountry.alpha3Code}
                        variant="outlined"
                        sx={{
                          textTransform: "none",
                        }}
                      >
                        {borderCountry.name}
                      </Button>
                    ))
                  ) : (
                    <Typography>None</Typography>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
      {/* </Box> */}
    </Layout>
  );
};

export default CountryDetails;
