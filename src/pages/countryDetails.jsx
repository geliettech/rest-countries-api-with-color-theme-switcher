import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/layout";
import {
  CardMedia,
  Box,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import CircularIndeterminate from "../components/loader";

const CountryDetails = () => {
  const { numericCode } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [borderCountries, setBorderCountries] = useState([]);

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
      })
      .catch((error) => {
        console.error("Error fetching country details:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [numericCode]);

  return (
    <Layout>
      <Box sx={{ padding: 4 }}>
      <Button
        component={Link}
        to="/"
        variant="contained"
        sx={{ marginBottom: 2 }}
      >
        <Link to="/">
          <FaArrowLeftLong /> back
        </Link>
      </Button>
      {loading ? (
        <CircularIndeterminate /> ) : (
        <Grid container spacing={4}>
          {/* Flag Section */}
          <Grid item sx={{ height: 400 }} xs={12} md={6}>
            <CardMedia
              component="img"
              src={country.flags.svg}
              alt="Country flag"
              sx={{
                borderRadius: 2,
                boxShadow: 2,
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
    </Box>
    </Layout>
    
  );
};

export default CountryDetails;
