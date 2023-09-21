import { Headphones } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import WhiteLogo from "../image/assets/white-logo.svg";

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* //////////////////////////////////////////
      /////////////////////////////////////////////// */}
      <nav>
        <div className="custom-container">
          <div className="navbar">
            <Link to="/">
              <img src={WhiteLogo} width="250" alt="logo" />
            </Link>
          </div>
        </div>
      </nav>

      {/* //////////////////////////////////////////////////
      /////////////////////////////////////////////////// */}
      <div className="landing-body-container">
        <div className="custom-container">
          <div className="landing-body">
            <h2>Empower MrBeast Fans to Shape His Next Challenge Video</h2>
            <section id="features">
              <ul>
                <li>Propose Exciting Challenges</li>
                <li>Vote on Your Favorite Challenges</li>
                <li>Potential to Be Featured in MrBeast's Videos</li>
              </ul>
            </section>

            <div className="d-flex">
              <button>
                <Link to="/challenges">Challenges</Link>
              </button>
              <button>
                <Link to="/challenges">Login</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
