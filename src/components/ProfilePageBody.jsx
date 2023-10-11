import React, { useEffect, useRef } from "react";
import SideProfile from "./SideProfile";
import { CircularProgress } from "@mui/material";
import PostCard from "./PostCard";
import { useIntersection } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  loadMoreUserChallenge,
} from "../reduxConfig/actions/profile-actions";

const ProfilePageBody = ({ profileId, userDetail, profileChallengeList }) => {
  const lastPost = useRef(null);
  const { ref, entry } = useIntersection({
    root: lastPost.current,
    threshold: 1,
  });
  const dispatch = useDispatch();

  const profileChallengeLastDoc = useSelector(
    (state) => state.challenges.profileChallengeLastDoc
  );

  useEffect(() => {
    if (entry?.isIntersecting) {
      loadMoreUserChallenge(profileId, dispatch, profileChallengeLastDoc);
    }
  }, [dispatch, entry?.isIntersecting, profileChallengeLastDoc, profileId]);

  return (
    <div className=" profile-section">
      <div className="default-section-nav">
        <div className="profile-show-sm">
          {/* <SideProfile /> */}
          <SideProfile />
        </div>
        <h3>Profile</h3>
      </div>
      <div className="default-section-body">
        {/* ////////////////////////////////////////////////
               Profile Picture and banners
        //////////////////////////////////////////////// */}

        {userDetail ? (
          <div className="user-image-banner">
            <div className="image-button">
              <img src={userDetail?.photoURL} alt="" />
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center">
            <CircularProgress />
          </div>
        )}

        {/* ////////////////////////////////////////////////
                User Details Here
        //////////////////////////////////////////////// */}
        {userDetail ? (
          <div className="user-details">
            <h4>{userDetail ? userDetail?.displayName : null}</h4>
            <h4 className="username">
              {userDetail ? userDetail?.username : null}
            </h4>
          </div>
        ) : null}

        {/* ////////////////////////////////////////////////
                User Post & Groups & Review
        //////////////////////////////////////////////// */}
        <div className="post-group-container">
          <div className="post-group-body">
            <div>
              {profileChallengeList ? (
                profileChallengeList.length > 0 ? (
                  profileChallengeList.map((challenge, index) => {
                    if (index === profileChallengeList.length - 1)
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
                )
              ) : (
                <div>
                  <h1>User has not challenge created yet</h1>
                </div>
              )}
            </div>
          </div>
        </div>
        {profileChallengeLastDoc ? (
          <div className="d-flex justify-content-center">
            <CircularProgress />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProfilePageBody;
