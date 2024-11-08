import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Detail = () => {
  return (
    <div>
      <Link to="/"><FontAwesomeIcon icon={faArrowLeft}/>back</Link>
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
