import React, { useEffect, useState } from "react";
// import { useTheme } from "next-themes";
import {
  DarkMode,
  LightModeOutlined,
  Login,
  Logout,
  Person,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { UserAuth } from "@/app/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import userLocalStorage from "use-local-storage";
import { switchThemeData } from "../reduxConfig/slices/stateProviderSlice";

const SideProfile = () => {
  const userDetail = useSelector((state) => state.user.userDetail);
  const [showUserOption, setUserOption] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.stateProvider.theme);

  // const [theme, setTheme] = userLocalStorage("theme" ? "dark" : "light");
  // const { theme, setTheme } = useTheme();
  const switchTheme = () => {
    dispatch(switchThemeData(theme === "light" ? "dark" : "light"));
  };
  // const route = useRouter();

  const userOptionAction = () => {
    if (showUserOption === "") {
      setUserOption("display-options");
    } else {
      setUserOption("");
    }
  };

  // useEffect(() => {
  //   document.body.addEventListener("click", () => {
  //     if (showUserOption === "display-options") {
  //       setUserOption("");
  //     }
  //   });
  // },[showUserOption]);

  const handleLogOut = async () => {
    try {
      signOut(auth);
      window.location.reload();
      // route.refresh()
    } catch (error) {
      alert(`Error from logging out ${error}`);
    }
  };

  // console.log("UserDetail",userDetail)

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
          <DarkMode />
          <span>Dark mode</span>
        </div>
      </div>
      <div
        className="sidebar-profile-img cursor-pointer"
        onClick={userOptionAction}
      >
        <Person />
        <span>{userDetail !== null ? userDetail.username : null}</span>
      </div>
    </div>
  );
};

export default SideProfile;
