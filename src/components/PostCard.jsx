import {
  Share,
} from "@mui/icons-material";
import React from "react";
import UserImg from "../image/icons/iconamoon_profile.svg";
import VoteFunctionContainer from "./VoteFunctionContainer";
import { Link } from "react-router-dom";

const PostCard = ({
  challengeId,
  title,
  description,
  challengeType,
  creator,
  publishedAt,
}) => {

  // Convert Firestore timestamp to JavaScript Date object
  const postDate = new Date(
    publishedAt.seconds * 1000 + publishedAt.nanoseconds / 1000000
  );

  // Get the current time
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifferenceMillis = currentDate - postDate;

  // Define time intervals in milliseconds
  const minuteMillis = 60 * 1000;
  const hourMillis = 60 * minuteMillis;
  const dayMillis = 24 * hourMillis;

  let timeAgoText;

  if (timeDifferenceMillis < minuteMillis) {
    // Less than a minute ago
    const secondsAgo = Math.floor(timeDifferenceMillis / 1000);
    timeAgoText =
      secondsAgo + (secondsAgo === 1 ? " second ago" : " seconds ago");
  } else if (timeDifferenceMillis < hourMillis) {
    // Less than an hour ago
    const minutesAgo = Math.floor(timeDifferenceMillis / minuteMillis);
    timeAgoText =
      minutesAgo + (minutesAgo === 1 ? " minute ago" : " minutes ago");
  } else if (timeDifferenceMillis < dayMillis) {
    // Less than a day ago
    const hoursAgo = Math.floor(timeDifferenceMillis / hourMillis);
    timeAgoText = hoursAgo + (hoursAgo === 1 ? " hour ago" : " hours ago");
  } else {
    // More than a day ago
    timeAgoText = postDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className="post-card">
      <VoteFunctionContainer
        flexDirection="flex-column"
        displayClass="hide-lg-vote"
        challengeId={challengeId}
      />
      <div className="">
        <div className="post-nav">
          <img src={UserImg} alt="user-img" />
          <div className="user-detail">
            <p>
              {challengeType} <span>Posted by</span>
              <Link to={`/profile/${creator}`} className="owner-name">
                {creator}
              </Link>
            </p>
            <span>{timeAgoText}</span>
          </div>
        </div>
        <Link
          to={`/challenges/${challengeId}`}
          className="text-decoration-none"
        >
          <div className="post-body">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </Link>
        <div className="post-footer">
          <VoteFunctionContainer
            flexDirection="flex-row"
            displayClass="hide-sm-vote"
            challengeId={challengeId}
          />

          <div className="post-footer-item">
            <Share />
            <span>Share</span>
            {/* {totalVotes.totalVotes} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
