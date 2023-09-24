import {
  FavoriteBorder,
  Favorite,
  Comment,
  Share,
  ArrowUpward,
  ThumbUp,
  ThumbDown,
  ThumbUpOutlined,
  ThumbDownOutlined,
} from "@mui/icons-material";
// import Image from "next/image";
import React, { useEffect, useState } from "react";
import UserImg from "../image/icons/iconamoon_profile.svg";
// import Link from "next/link";
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
  const [voteUp, setVoteUp] = useState(false);
  const [voteDown, setVoteDown] = useState(false);

  const voteUpAction = () => {
  };

  const voteDownAction = () => {};


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
            <span>{publishedAt}</span>
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
          {/* <Image src={UserImg} width="20" height="20" alt="user-img" /> */}
          <VoteFunctionContainer
            flexDirection="flex-row"
            displayClass="hide-sm-vote"
            challengeId={challengeId}
          />
          {/* <div className="post-footer-item">
            <Comment />
            <span>22 Comments</span>
          </div> */}
          <div className="post-footer-item">
            <Share />
            <span>Share</span>
          </div>
          {/* <Favorite /> */}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
