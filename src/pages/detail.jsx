import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";

const Detail = () => {
  return (
    <div>
      <Link to="/">back</Link>
      <div>
        <img src="" alt="" />
        <div>
          <h2>
            country name
          </h2>
          <p>
            <span>Native  Name</span>
            <span></span>
          </p>
          <p>
            <span>Native  Name</span>
            <span></span>
          </p>
          <p>
            <span>Native  Name</span>
            <span></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
