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
} from "@mui/material";
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 4,
          flexWrap: "wrap",
        }}
      >
        <Box className={styles.SearchInput_Wrapper}>
          <IoMdSearch className={styles.searchIcon} />
          {/* Search Input */}
          <TextField
            variant="outlined"
            placeholder="Search for a country..."
            fullWidth
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            className={styles.searchInputField}
          />
        </Box>

        {/* Filter Dropdown */}
        <TextField
          select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          variant="outlined"
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
      {loading ? (
        <CircularIndeterminate />
      ) : (
        <Grid container spacing={8}>
          {filteredCountries.map((country) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={country.numericCode}>
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
                  <CardContent sx={{ padding: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                      {country.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ marginBottom: 0.5, fontSize: "14px" }}
                    >
                      <strong style={{ fontWeight: 600 }}>Population:</strong>{" "}
                      <span style={{ fontWeight: 300 }}>
                        {country.population.toLocaleString()}
                      </span>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ marginBottom: 0.5, fontSize: "14px" }}
                    >
                      <strong style={{ fontWeight: 600 }}>Region: </strong>
                      <span style={{ fontWeight: 300 }}>{country.region}</span>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ marginBottom: 0.5, fontSize: "14px" }}
                    >
                      <strong style={{ fontWeight: 600 }}>Capital: </strong>
                      <span style={{ fontWeight: 300 }}>{country.capital}</span>
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
