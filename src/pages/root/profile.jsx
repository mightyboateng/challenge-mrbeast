import React, { useEffect, useState, useRef } from "react";
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

const ProfilePage = () => {
  const { profileId } = useParams();
  const userProfileDetail = useSelector((state) => state.user.userProfile);
  const [challenges, setChallenges] = useState([]);
  const [challengesId, setChallengesId] = useState([]);
  const [lastDoc, setLastDoc] = useState("");
  const scrollRef = useRef();
  const containerRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    ////////////////////////////////
    // Query for user details
    ////////////////////////
    const userRef = collection(firestoreDb, "users");
    const queryUser = query(userRef, where("username", "==", profileId));

    const queryUserSnap = async () => {
      const result = await getDocs(queryUser);
      dispatch(updateUserProfileDetail(result.docs[0].data()));
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

      queryResult.docs.map((doc) => {
        // console.log("Result ", doc.data());
        setChallenges((oldValue) => [...oldValue, doc.data()]);
        setChallengesId((oldValue) => [...oldValue, doc.id]);
      });

      setLastDoc(queryResult.docs[queryResult.docs.length - 1]);
    };

    return () => {
      queryUserSnap();
      loadUserChallenge();
    };
  }, [profileId]);

  const loadMoreChallenge = async () => {
    const challengeRef = collection(firestoreDb, "challenges");
    const queryChallenge = query(
      challengeRef,
      where("creatorUsername", "==", profileId),
      orderBy("publishedAt", "desc"),
      startAfter(lastDoc || 0),
      limit(2)
    );
    const queryResult = await getDocs(queryChallenge);

    queryResult.docs.map((doc) => {
      // console.log("Result ", doc.data());
      setChallenges((oldValue) => [...oldValue, doc.data()]);
      setChallengesId((oldValue) => [...oldValue, doc.id]);
    });

    setLastDoc(queryResult.docs[queryResult.docs.length - 1]);
  };

  const handleScrollController = (e) => {
    const element = e.target;
    const isAtBottom =
      element.scrollHeight - element.scrollTop === element.clientHeight;

    // console.log("Scrolling from the Profile ", isAtBottom);
    if (isAtBottom) {
      loadMoreChallenge();
    }
  };

  return (
    <RootLayout title={profileId}>
      <div className=" profile-section" onScroll={handleScrollController}>
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
                {challenges ? (
                  challenges.length > 0 ? (
                    challenges.map((challenge, index) => (
                      <PostCard
                        key={index}
                        challengeId={challengesId[index]}
                        title={challenge.challengeTitle}
                        description={challenge.challengeDescription}
                        challengeType={challenge.challengeType}
                        creator={challenge.creatorUsername}
                        publishedAt={challenge.publishedAt}
                      />
                    ))
                  ) : (
                    <div>
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
          {lastDoc ? (
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
