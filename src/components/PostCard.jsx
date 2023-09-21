
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
import React, { useState } from "react";
import UserImg from "../image/icons/iconamoon_profile.svg";
// import Link from "next/link";
import VoteFunctionContainer from "./VoteFunctionContainer";
import {  Link} from "react-router-dom";

const PostCard = () => {
  const [voteUp, setVoteUp] = useState(false);
  const [voteDown, setVoteDown] = useState(false);

  const voteUpAction = () => {
    if (voteDown === true) {
    }
  };

  const voteDownAction = () => {};

  return (
    <div className="post-card">
    
      <VoteFunctionContainer
        flexDirection="flex-column"
        displayClass="hide-lg-vote"
      />
      <div className="">
        <div className="post-nav">
          <img src={UserImg} alt="user-img" />
          <div className="user-detail">
            <p>
              mb/charity <span>Posted by</span>
              <Link to="/profile/nana-kwame" className="owner-name">
                Michael Nana Adams
              </Link>
            </p>
            <span>1 day ago</span>
          </div>
        </div>
        <Link to="/challenges/1" className="text-decoration-none">
          <div className="post-body">
            <h3>Master the Art of Prompting with Mighty Mike</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </Link>
        <div className="post-footer">
          {/* <Image src={UserImg} width="20" height="20" alt="user-img" /> */}
          <VoteFunctionContainer
            flexDirection="flex-row"
            displayClass="hide-sm-vote"
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
