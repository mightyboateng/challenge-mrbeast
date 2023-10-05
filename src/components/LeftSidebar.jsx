import {
  Assessment,
  Coffee,
  Create,
  LaptopMac,
  Person,
  YouTube,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import IconLogo from "../image/assets/blue-icon-logo.svg";

import SideProfile from "./SideProfile";

function LeftSidebar({hideSM}) {
  const { pathname } = useLocation();

  const userDetails = useSelector((state) => state.user.userDetail);

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
            to="/create-challenge"
            className={`sidebar-item ${
              pathname === "/create-challenge" ? "active-sidebar-item" : null
            }`}
          >
            <Create />
            <span>Create</span>
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

          {userDetails ? (
            <Link
              to={`/profile/${userDetails.username}`}
              className={`sidebar-item ${
                pathname === `/profile/${userDetails.username}`
                  ? "active-sidebar-item"
                  : null
              }`}
            >
              <Person />
              <span>Profile</span>
            </Link>
          ) : null}

          <Link
            to="https://www.buymeacoffee.com/mightymakersdev"
            target="_blank"
            className={`sidebar-item `}
          >
            <Coffee />
            <span>Buy me Coffee</span>
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
