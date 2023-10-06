import React, { useEffect, useRef } from "react";
import RootLayout from "../../components/RootLayout";
import PostCard from "../../components/PostCard";
import SideProfile from "../../components/SideProfile";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { firestoreDb } from "../../firebase/firebase-config";
import { CircularProgress } from "@mui/material";
import { updateUserProfileDetail } from "../../reduxConfig/slices/userSlice";
import {
  loadFirstProfileChallengeList,
  loadMoreProfileChallengeList,
  updateProfileLastDoc,
} from "../../reduxConfig/slices/challengeSlice";
import { useIntersection } from "@mantine/hooks";

const ProfilePage = () => {
  const { profileId } = useParams();
  const userProfileDetail = useSelector((state) => state.user.userProfile);
  const profileChallengeList = useSelector(
    (state) => state.challenges.profileChallengeList
  );
  const profileChallengeLastDoc = useSelector(
    (state) => state.challenges.profileChallengeLastDoc
  );
  const lastPost = useRef(null);
  const dispatch = useDispatch();
  const { ref, entry } = useIntersection({
    root: lastPost.current,
    threshold: 1,
  });

  useEffect(() => {
    ////////////////////////////////
    // Query for user details
    ////////////////////////
    const userRef = collection(firestoreDb, "users");
    const queryUser = query(userRef, where("username", "==", profileId));

    const queryUserSnap = async () => {
      const result = await getDocs(queryUser);
      if (result.docs.length !== 0) {
        dispatch(updateUserProfileDetail(result.docs[0]?.data()));
      }
    };

    ////////////////////////////////
    // Query for user challenges
    ////////////////////////
    const loadUserChallenge = async () => {
      const challengeRef = collection(firestoreDb, "challenges");

      const queryChallenge = query(
        challengeRef,
        where("creatorUsername", "==", profileId),
        orderBy("publishedAt", "desc"),
        limit(3)
      );
      const queryResult = await getDocs(queryChallenge);

      dispatch(loadFirstProfileChallengeList(queryResult.docs));

      dispatch(
        updateProfileLastDoc(queryResult.docs[queryResult.docs.length - 1])
      );
    };

    return () => {
      queryUserSnap();
      // if (userProfileDetail?.username !== profileId) {
        loadUserChallenge();
      // }
    };
  }, [dispatch, profileId]);

  // useEffect(() => {
  //   if (userProfileDetail?.username !== profileId) {

  //   }
  //   return () => {
      
  //   };
  // }, []);

  /////////////////////////////////
  ///// Load more challenges onScrolling - Function
  /////////////////////////
  useEffect(() => {
    const loadMoreChallenge = async () => {
      const challengeRef = collection(firestoreDb, "challenges");
      const queryChallenge = query(
        challengeRef,
        where("creatorUsername", "==", profileId),
        orderBy("publishedAt", "desc"),
        startAfter(profileChallengeLastDoc || 0),
        limit(2)
      );
      const queryResult = await getDocs(queryChallenge);

      dispatch(loadMoreProfileChallengeList(queryResult.docs));

      dispatch(
        updateProfileLastDoc(queryResult.docs[queryResult.docs.length - 1])
      );
    };

    if (entry?.isIntersecting) {
      loadMoreChallenge()
    }

    return () => {};
  }, [dispatch, entry?.isIntersecting, profileChallengeLastDoc, profileId]);


  return (
    <RootLayout title={profileId}>
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

          {userProfileDetail ? (
            <div className="user-image-banner">
              <div className="image-button">
                <img src={userProfileDetail?.photoURL} alt="" />
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
          {userProfileDetail ? (
            <div className="user-details">
              <h4>
                {userProfileDetail ? userProfileDetail?.displayName : null}
              </h4>
              <h4 className="username">
                {userProfileDetail ? userProfileDetail?.username : null}
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
    </RootLayout>
  );
};

export default ProfilePage;
