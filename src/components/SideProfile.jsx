import React, {  useState } from "react";
import {
  DarkMode,
  LightMode,
  Login,
  Logout,
  Person,
} from "@mui/icons-material";
import {  useSelector } from "react-redux";
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
      signOut(auth);
      window.location.reload();
      // route.refresh()
    } catch (error) {
      alert(`Error from logging out ${error}`);
    }
  };


  return (
    <div className="sidebar-profile">
      <div className={`sidebar-options ${showUserOption}`}>
        {!userDetail ? (
          <div
            className="option-item cursor-pointer"
            onClick={() => navigate("/login")}
          >
            <Login /> Login
          </div>
        ) : (
          <div className="option-item cursor-pointer" onClick={handleLogOut}>
            <Logout /> Logout
          </div>
        )}

        <div className="option-item cursor-pointer" onClick={switchTheme}>
          {themeData === "light" ? (
            <>
              <DarkMode />
              <span>Dark mode</span>
            </>
          ) : (
            <>
              <LightMode />
              <span>Light mode</span>
            </>
          )}
        </div>
      </div>
      <div
        className="sidebar-profile-img cursor-pointer"
        onClick={userOptionAction}
      >
        {userDetail !== null ? (
          <img
            className="user-side-photo"
            src={userDetail.photoURL}
            alt={userDetail.username}
          />
        ) : (
          <Person />
        )}

        <span>{userDetail !== null ? userDetail.username : null}</span>
      </div>
    </div>
  );
};

export default SideProfile;
