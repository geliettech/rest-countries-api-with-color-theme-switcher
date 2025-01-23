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
      {/* <Button
        component={Link}
        to="/"
        sx={(theme) => ({
          mt: 3,
          mb: 8,
          boxShadow: theme.boxShadow,
          padding: "6px 28px",
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.paper,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        })}
      > */}
         <Button>
        <FaArrowLeftLong />
        <Typography>
        {/* <Typography
          component="span"
          sx={{
            marginLeft: "6px",
            textTransform: "capitalize",
            fontSize: { xs: "12px", sm: "14px" },
          }}
        > */}
          back
        </Typography>
      </Button>
      {error && (
        // <Alert severity="error" sx={{ mb: 3 }}>
        <Alert severity="error">
          {error}
        </Alert>
      )}
      {loading ? (
        <CircularIndeterminate />
      ) : (
        country && (
          <Grid container spacing={4} alignItems="center">
          {/* <Grid container alignItems="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> */}
            {/* Flag Section */}
             {/* <Grid item sx={{ height: 400 }} xs={12} md={6}> */}
             <Grid item xs={12} md={6}>
              {/* <CardMedia
                component="img"
                image={country.flags.svg}
                alt={`${country.name} flag`}
                sx={{ height: "100%", objectFit: "contain" }}
              /> */}
              <CardMedia
                component="img"
                image={country.flags.svg}
                alt={`${country.name} flag`}
              />
            </Grid> 

            {/* Country Details Section */}
            {/* <Grid item xs={12} md={6}> */}
            <Grid item xs={12} md={6}>
              {/* <Typography variant="h4" sx={{ fontWeight: 800 }} gutterBottom> */}
              <Typography variant="h4" gutterBottom>
                {country.name}
              </Typography>

              {/* <Grid container spacing={2}> */}
              <Grid container>
                {/* <Grid item xs={12} sm={6}> */}
                <Grid>
                  {/* <Typography className={styles.country_details}> */}
                  <Typography>
                    <strong>Native Name: </strong>
                    <span>{country.nativeName || "N/A"}</span>
                  </Typography>
                  {/* <Typography className={styles.country_details}> */}
                  <Typography>
                    <strong>Population: </strong>
                    <span>
                      {country.population
                        ? country.population.toLocaleString()
                        : "N/A"}
                    </span>
                  </Typography>
                  {/* <Typography className={styles.country_details}> */}
                  <Typography>
                    <strong>Region: </strong>
                    <span>{country.region || "N/A"}</span>
                  </Typography>
                  {/* <Typography className={styles.country_details}> */}
                  <Typography>
                    <strong>Sub Region: </strong>
                    <span>{country.subregion || "N/A"}</span>
                  </Typography>
                  {/* <Typography className={styles.country_details}> */}
                  <Typography>
                    <strong>Capital: </strong>
                    <span>{country.capital || "N/A"}</span>
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  {/* <Typography className={styles.country_details}> */}
                  <Typography>
                    <strong>Top Level Domain: </strong>
                    <span>
                      {country.topLevelDomain
                        ? country.topLevelDomain.join(", ")
                        : "N/A"}
                    </span>
                  </Typography>
                  {/* <Typography className={styles.country_details}> */}
                  <Typography>
                    <strong>Currencies: </strong>
                    <span>
                      {country.currencies
                        ? country.currencies
                            .map((currency) => currency.name)
                            .join(", ")
                        : "N/A"}
                    </span>
                  </Typography>
                  {/* <Typography className={styles.country_details}> */}
                  <Typography>
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
              {/* <Box
                mt={4}
                className={styles.country_details}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: 2,
                }}
              > */}
              <Box>
                {/* <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, fontSize: "16px" }}
                > */}
                 <Typography variant="h6">
                  Border Countries:
                </Typography>
                {/* <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}> */}
                <Box>
                  {borderCountries.length > 0 ? (
                    borderCountries.map((borderCountry) => (
                      // <Button
                      //   component={Link}
                      //   to={`/country/${borderCountry.numericCode}`}
                      //   key={borderCountry.alpha3Code}
                      //   sx={(theme) => ({
                      //     textTransform: "none",
                      //     color: theme.palette.text.primary,
                      //     backgroundColor: theme.palette.background.paper,
                      //     boxShadow: theme.boxShadow,
                      //     fontWeight: theme.typography.fontWeightLight,
                      //     fontSize: theme.typography.fontSizeMedium,
                      //   })}
                      // >
                      <Button  component={Link} to={`/country/${borderCountry.numericCode}`} key={borderCountry.alpha3Code}>
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
