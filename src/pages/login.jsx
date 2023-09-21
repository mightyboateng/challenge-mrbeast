// import { auth, db, getSpecificUser } from "@/firebase/firebase_config";
// import { loginUser } from "@/reduxConfig/slices/userSlice";
import { Close } from "@mui/icons-material";
// import { onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import Image from "next/image";
// import Link from "next/link";
import { Link, useNavigate } from "react-router-dom";
// import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconLogo from "../image/assets/blue-icon-logo.svg";
import GoogleLogo from "../image/assets/google.png";

const LoginPage = () => {
  return (
    <div className="login-signup-section login-section">
      <div className="auth-container">
        <div className="close-btn">
          <Link to="/challenges">
            <Close />
          </Link>
        </div>
        <div className="auth">
          <img src={IconLogo} width="50" height="50" alt="login-logo" />
          <div className="">
            <h2>Sign in to ChallengeMrBeast</h2>

            <button>
              <div className="google-btn-container">
                <img
                  src={GoogleLogo}
                  width="20"
                  height="20"
                  alt="google-icon"
                />
                Sign in with Google
              </div>
            </button>
            <div className="new-user-account">
              <p>
                Don't have an account? <Link to="/sign-up">Signup</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
