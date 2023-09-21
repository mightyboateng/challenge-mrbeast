import React, { useEffect, useState } from "react";
// import { useTheme } from "next-themes";
import {
  DarkMode,
  LightModeOutlined,
  Login,
  Logout,
  Person,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { UserAuth } from "@/app/context/AuthContext";
import { useNavigate } from "react-router-dom";

const SideProfile = () => {
  // const userDetail = useSelector((state) => state.user.userDetail);
  const [showUserOption, setUserOption] = useState("");
  const navigate = useNavigate();
  // const { theme, setTheme } = useTheme();
  // const switchTheme = () => {
  //   const newTheme = theme === "light" ? "dark" : "light";
  //   setTheme(newTheme);
  // };
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
  // },);

  const handleLogOut = async () => {
    try {
      // logOut();
      // route.refresh()
    } catch (error) {
      alert(`Error from logging out ${error}`);
    }
  };

  // console.log("UserDetail",userDetail)

  return (
    <div className="sidebar-profile">
      <div className={`sidebar-options ${showUserOption}`}>
        {/* {!userDetail ? ( */}
        <div
          className="option-item cursor-pointer"
          onClick={() => navigate("/login")}
        >
          <Login /> Login
        </div>
        {/* ) : (
          <div className="option-item cursor-pointer" onClick={handleLogOut}>
            <Logout /> Logout
          </div>
        )} */}

        <div className="option-item cursor-pointer">
          <DarkMode />
          <span>Dark mode</span>
        </div>
      </div>
      <div
        className="sidebar-profile-img cursor-pointer"
        onClick={userOptionAction}
      >
        <Person />
        <span>Michael Adams</span>
      </div>
    </div>
  );
};

export default SideProfile;
