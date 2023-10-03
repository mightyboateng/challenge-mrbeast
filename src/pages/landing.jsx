import { Favorite } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import WhiteLogo from "../image/assets/white-logo.svg";

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* //////////////////////////////////////////
      /////////////////////////////////////////////// */}
      <div className="navbar">
        <Link to="/">
          <img src={WhiteLogo} width="200" alt="logo" />
        </Link>
      </div>

      {/* //////////////////////////////////////////////////
      /////////////////////////////////////////////////// */}
      <div className="landing-body-container">
        <h1>Challenge MrBeast & his team on his next video</h1>
        <p>
          Based on your challenge, other users can up vote or down vote. It
          could even be a source of inspiration to MrBeast & his team
        </p>

        <div className="d-flex btns-container">
          <Link to="/challenges">
            <button className="btn-challenge">Challenges</button>
          </Link>
          <Link to="/login">
            <button className="btn-login">Login</button>
          </Link>
        </div>
      </div>

      {/* //////////////////////////////////////////////////
      /////////////////////////////////////////////////// */}
      <div className="landing-body-footer">
        <div className="hr-line"></div>
        <span className="d-flex justify-content-center">
          built with <Favorite /> from{"    "}
          <Link to="https://www.youtube.com/@mightydevs" target="blank">
            mighty devs
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LandingPage;
