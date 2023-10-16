import React, { useEffect, useRef } from "react";
import RootLayout from "../../components/RootLayout";
import PostCard from "../../components/PostCard";
import SideProfile from "../../components/SideProfile";
import { useDispatch, useSelector } from "react-redux";

import { CircularProgress } from "@mui/material";
import { useIntersection } from "@mantine/hooks";
import { PeopleAltOutlined, Person, Public } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  loadChallenges,
  loadMoreChallengeAction,
} from "../../reduxConfig/actions/challenge-actions";

const ChallengesPage = () => {
  const lastPost = useRef(null);
  const userDetail = useSelector((state) => state.user.userDetail);
  const challengesList = useSelector((state) => state.challenges.challengeList);
  const challengeLastDoc = useSelector(
    (state) => state.challenges.challengeLastDoc
  );

  const dispatch = useDispatch();
  const { ref, entry } = useIntersection({
    root: lastPost.current,
    threshold: 1,
  });

  /////////////////////////////////
  ///// Initial Data loading
  /////////////////////////
  useEffect(() => {
    loadChallenges(dispatch);
  }, [dispatch]);

  /////////////////////////////////
  ///// Load more challenges onScrolling - Function
  /////////////////////////
  useEffect(() => {
    if (entry?.isIntersecting) {
      loadMoreChallengeAction(dispatch, challengeLastDoc);
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry?.isIntersecting]);

  return (
    <RootLayout title="Challenges">
      <div className="feed-section">
        <div className="default-section-nav">
          <div className="profile-show-sm">
            <SideProfile />
          </div>
          <h3>Challenges</h3>
        </div>
        <div className="create-from-feed">
          <div className="profile-textfield">
            {userDetail !== null ? (
              <Link to={`/profile/${userDetail.username}`}>
                <img
                  className="user-side-photo"
                  src={userDetail.photoURL}
                  alt={userDetail.username}
                />
              </Link>
            ) : (
              <Person className="user-side-photo" />
            )}
            <Link to="/create-challenge" className="text-field">
              <div className="text-field-text">What do you have in mind?</div>
            </Link>
          </div>
          <div className="icon-button">
            <PeopleAltOutlined className="mx-1" />
            <Public className="mx-1" />
            <button>Post</button>
          </div>
        </div>
        {/* <div className="load-btn-container">
          <button onClick={queryNewChallengeAction}>Load new challenges</button>
        </div> */}

        <div className="contents-container challenges-container">
          {challengesList.length !== 0 ? (
            challengesList.map((challenge, index) => {
              if (index === challengesList.length - 1)
                return (
                  <PostCard
                    cardRef={ref}
                    key={index}
                    challengeId={challenge.id}
                    title={challenge.data().challengeTitle}
                    description={challenge.data().challengeDescription}
                    challengeType={challenge.data().challengeType}
                    creator={challenge.data().creatorUsername}
                    publishedAt={challenge.data().publishedAt}
                    creatorPhoto={challenge.data().creatorPhoto}
                  />
                );

              return (
                <PostCard
                  key={index}
                  challengeId={challenge.id}
                  title={challenge.data().challengeTitle}
                  description={challenge.data().challengeDescription}
                  challengeType={challenge.data().challengeType}
                  creator={challenge.data().creatorUsername}
                  publishedAt={challenge.data().publishedAt}
                  creatorPhoto={challenge.data().creatorPhoto}
                />
              );
            })
          ) : (
            <div className="d-flex justify-content-center">
              
              <CircularProgress />
            </div>
          )}
        </div>

        {challengeLastDoc ? (
          <div className="d-flex justify-content-center">
            <CircularProgress />
          </div>
        ) : null}
      </div>
    </RootLayout>
  );
};

export default ChallengesPage;
