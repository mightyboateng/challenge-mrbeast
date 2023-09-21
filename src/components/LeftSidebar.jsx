import {
  Assessment,
  CodeOff,
  Coffee,
  Create,
  LaptopMac,
  Person,
  YouTube,
} from "@mui/icons-material";
// import Image from "next/image";
import { useEffect, useState } from "react";

// import { useRouter, usePathname } from "next/navigation";
// import { useSelector } from "react-redux";
// import SideProfile from "./SideProfile";
import { Link, useParams } from "react-router-dom";
import IconLogo from "../image/assets/blue-icon-logo.svg";

import SideProfile from "./SideProfile";
// import { sidebarLinks } from "@/constants/index";

function LeftSidebar() {
  const { pathname } = useParams();
  // const path = Pathname()
  // const userDetails = useSelector((state) => state.user.userDetail);

  // await new Promise((resolve) => setTimeout(resolve, 10000));

  // console.log("Pathname", path)

  return (
    <div className="sidebar-bottom-navbar">
      <div>
        <Link to="/challenges">
          <img className="netx-logo" src={IconLogo} alt="logo" />
        </Link>

        <div className="sidebar-links-section">
          <Link
            to="/challenges"
            className={`sidebar-item ${
              pathname === "/challenges" ? "active-sidebar-item" : null
            }`}
          >
            <Assessment />
            <span>Challenges</span>
          </Link>

          <Link
            to="https://www.buymeacoffee.com/mightymakersdev"
            target="_blank"
            className={`sidebar-item `}
          >
            <LaptopMac />
            <span>Buy me macbook</span>
          </Link>

          <Link
            to="/mr-beast"
            className={`sidebar-item ${
              pathname === "/mr-beast" ? "active-sidebar-item" : null
            }`}
          >
            <YouTube className="bg-fill-danger" />
            <span>Mr Beast</span>
          </Link>

          <Link
            to="/create-challenge"
            className={`sidebar-item ${
              pathname === "/create-challenge" ? "active-sidebar-item" : null
            }`}
          >
            <Create />
            <span>Create</span>
          </Link>

          <Link
            to={"/profile/might_mike"}
            className={`sidebar-item ${
              pathname === "/profile/" ? "active-sidebar-item" : null
            }`}
          >
            <Person />
            <span>Profile</span>
          </Link>
        </div>
      </div>

      <div className="hide-sm">
        <SideProfile />
      </div>
    </div>
  );
}

export default LeftSidebar;
