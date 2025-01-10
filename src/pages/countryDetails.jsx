import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import styles from "../styles/countryDetails.module.css";
import axios from "axios";
import Layout from "../components/layout";

const CountryDetails = () => {
  const { numericCode } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    // Fetch main country data
    axios
      .get("https://restcountries.com/v2/all") // Make sure this path is correct
      .then((response) => {
        const countryData = response.data.find(
          (c) => c.numericCode === numericCode
        );
        setCountry(countryData);

        if (countryData && countryData.borders) {
          // Fetch border countries by their codes
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
      <Link to="/">
        <FaArrowLeftLong /> back
      </Link>
      {loading ? (
        <p>Loading country Details...</p>
      ) : (
        <div className={styles.country_details}>
          <img src={country.flags.svg} alt="country flag" />
          <div>
            <h3>{country.name}</h3>
            <div className={styles.details}>
              <p>
                <strong>Native Name</strong>:&nbsp;
                <span>{country.nativeName}</span>
              </p>
              <p>
                <strong>Population</strong>:&nbsp;
                <span>{country.population}</span>
              </p>
              <p>
                <strong>Region</strong>:&nbsp;<span>{country.region}</span>
              </p>
              <p>
                <strong>Sub Region</strong>:&nbsp;
                <span>{country.subregion}</span>
              </p>
              <p>
                <strong>Capital</strong>:&nbsp;<span>{country.capital}</span>
              </p>
              <p>
                <strong>Top Level Domain</strong>:&nbsp;
                <span>{country.topLevelDomain}</span>
              </p>
              <p>
                <strong>Currencies</strong>:&nbsp;
                <span>
                  {country.currencies
                    .map((currency) => currency.name)
                    .join(", ")}
                </span>
              </p>
              <p>
                <strong>Languages</strong>:&nbsp;
                <span>
                  {country.languages
                    .map((language) => language.name)
                    .join(", ")}
                </span>
              </p>
            </div>
            <div>
              <strong>Border Countries</strong>:&nbsp;
              <span>
                {borderCountries.length > 0
                  ? borderCountries.map((borderCountry) => (
                      <Link
                        to={`/country/${borderCountry.numericCode}`} // Adjust the path if necessary
                        key={borderCountry.alpha3Code}
                        className={styles.border_link}
                      >
                        <div> {borderCountry.name}</div>
                      </Link>
                    ))
                  : "None"}
              </span>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CountryDetails;
