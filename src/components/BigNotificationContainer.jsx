import { Close, ThumbDown, ThumbUp } from "@mui/icons-material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotificationBanner } from "../reduxConfig/slices/userSlice";
import { useNavigate } from "react-router-dom";

const BigNotificationContainer = () => {
  const dispatch = useDispatch();
  const displayBanner = useSelector((state) => state.user.userNotification);
  const navigate = useNavigate();

  const handleCloseNotificationAction = () => {
    dispatch(showNotificationBanner(""));
  };

  const handleLoginNavigate = () => {
    navigate("/login");
    dispatch(showNotificationBanner(""));
  };

  const handleSignupNavigate = () => {
    navigate("/login");
    dispatch(showNotificationBanner(""));
  };
  return (
    <div className={`big-notification-container ${displayBanner}`}>
      <div className="notification-card">
        <div className="card-head">
          <Close
            onClick={handleCloseNotificationAction}
            className="cursor-pointer"
          />
        </div>
        <div className="card-body">
          <h3>Login or Sign up </h3>
          <p className="">
            Having a challenge in mind! Wanting to vote a challenge{" "}
            <span>
              <ThumbDown /> or <ThumbUp />
            </span>{" "}
            , login or sign up to submit the best ideas
          </p>

          <button onClick={handleLoginNavigate}>Login now</button>
          <button onClick={handleSignupNavigate}>Sign up now</button>
        </div>
      </div>
    </div>
  );
};

export default BigNotificationContainer;
