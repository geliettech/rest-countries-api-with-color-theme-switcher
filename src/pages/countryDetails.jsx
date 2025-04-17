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

        if (countryData) {
          setError(false);
          setCountry(countryData);

          // Fetch border countries
          if (countryData.borders) {
            const borderData = countryData.borders
              .map((borderCode) =>
                response.data.find((c) => c.alpha3Code === borderCode)
              )
              .filter((c) => c); // Filter out undefined values
            setBorderCountries(borderData);
          }
          // setError(false);
        } else {
          throw new Error("Country not found");
        }
      })
      .catch((err) => {
        console.error("Error fetching country details:", err);
        setError(`Failed to fetch country details. Please try again later.`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [numericCode]);

  return (
    <Layout layoutClassName={styles.countryDetails}>
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
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {loading ? (
        <CircularIndeterminate />
      ) : (
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
                {country.name}
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
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
                  })}
                >
                  Border Countries:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: { xs: "wrap", sm: "wrap", md: "wrap" },
                    gap: 2,
                  }}
                >
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

export default CountryDetails;
