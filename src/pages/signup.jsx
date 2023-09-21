import React from 'react'

import { Close } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import IconLogo from "../image/assets/blue-icon-logo.svg";
import GoogleLogo from "../image/assets/google.png";

const SignupPage = () => {
  return (
    <div className="login-signup-section signup-section">
      <div className="auth-container">
        <div className="close-btn">
          <Link to="/challenges">
            <Close />
          </Link>
        </div>
        <div className="auth">
          <img src={IconLogo} width="50" height="50" alt="login-logo" />
          <div className="">
            <h2>Join ChallengeMrBeast today</h2>

            <button>
              <div className="google-btn-container">
                <img
                  src={GoogleLogo}
                  width="20"
                  height="20"
                  alt="google-icon"
                />
                Sign up with Google
              </div>
            </button>

            <div className="old-user-account">
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
