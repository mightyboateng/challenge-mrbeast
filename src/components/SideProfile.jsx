import React, { useState, useEffect } from "react";
import {
  DarkMode,
  LightMode,
  Login,
  Logout,
  Person,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { useThemeData } from "./ThemeDataContext";

const SideProfile = () => {
  const userDetail = useSelector((state) => state.user.userDetail);
  const [showUserOption, setUserOption] = useState("");
  const navigate = useNavigate();

  const { setThemeData, themeData } = useThemeData();

  const switchTheme = () => {
    setThemeData(themeData === "light" ? "dark" : "light");
  };

  const userOptionAction = () => {
    if (showUserOption === "") {
      setUserOption("display-options");
    } else {
      setUserOption("");
    }
  };

  const handleLogOut = async () => {
    try {
      signOut(auth).then(() => {
        window.location.reload();
      });
    } catch (error) {
      alert(`Error from logging out ${error}`);
    }
  };

  useEffect(() => {
    // document.getElementById("sidebar-profile").addEventListener("click", () => {
    //   console.log("yes yes");
    // });

    document.body.addEventListener("click", (e) => {
      const result = e.target.classList.contains("hide-userOption-from")
      if(!result) {
        setUserOption("")
      }
    });

    return () => {};
  }, []);

  return (
    <div className="sidebar-profile" id="sidebar-profile">
      <div className={`sidebar-options hide-userOption-from ${showUserOption}`}>
        {!userDetail ? (
          <div
            className="option-item cursor-pointer hide-userOption-from"
            onClick={() => navigate("/login")}
          >
            <Login /> Login
          </div>
        ) : (
          <div
            className="option-item cursor-pointer hide-userOption-from"
            onClick={handleLogOut}
          >
            <Logout /> Logout
          </div>
        )}

        <div
          className="option-item cursor-pointer hide-userOption-from"
          onClick={switchTheme}
        >
          {themeData === "light" ? (
            <>
              <DarkMode className="hide-userOption-from" />
              <span className="hide-userOption-from">Dark mode</span>
            </>
          ) : (
            <>
              <LightMode className="hide-userOption-from" />
              <span className="hide-userOption-from">Light mode</span>
            </>
          )}
        </div>
      </div>
      <div
        className="sidebar-profile-img cursor-pointer hide-userOption-from"
        onClick={userOptionAction}
      >
        {userDetail !== null ? (
          <img
            className="user-side-photo hide-userOption-from"
            src={userDetail.photoURL}
            alt={userDetail.username}
          />
        ) : (
          <Person className="hide-userOption-from" />
        )}

        <span className="hide-userOption-from">
          {userDetail !== null ? userDetail.username : null}
        </span>
      </div>
    </div>
  );
};

export default SideProfile;
