import React, { useEffect, useState, useRef } from "react";
import RootLayout from "../../components/RootLayout";
import PostCard from "../../components/PostCard";
import SideProfile from "../../components/SideProfile";

import UserImg from "../../image/icons/iconamoon_profile.svg";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  Timestamp,
  collection,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { firestoreDb } from "../../firebase/firebase-config";
import { CircularProgress } from "@mui/material";
// import SideProfile from "../SideProfile";
// import PostCard from "../PostCard";

const ProfilePage = () => {
  // const {pathname} = useLocation
  const { profileId } = useParams();

  const userDetail = useSelector((state) => state.user.userDetail);
  const [otherUserDetail, setOtherUserDetail] = useState();
  const [challenges, setChallenges] = useState([]);
  const [challengesId, setChallengesId] = useState([]);
  const [lastDoc, setLastDoc] = useState("");
  const scrollRef = useRef();
  const containerRef = useRef(null);

  useEffect(() => {
    ////////////////////////////////
    // Query for user details
    ////////////////////////
    const userRef = collection(firestoreDb, "users");
    const queryUser = query(userRef, where("username", "==", profileId));

    const queryUserSnap = async () => {
      const result = await getDocs(queryUser);
      setOtherUserDetail(result.docs[0].data());
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

  /////////////////////////////////
  ///// Load more challenges onScrolling - Function
  /////////////////////////
  const handleScroll = () => {
    if (containerRef.current && scrollRef.current) {
      const container = containerRef.current;
      const loader = scrollRef.current;

      const isAtBottom =
        container.scrollTop + container.clientHeight + 15 >= loader.offsetTop;

      if (isAtBottom) {
        console.log("We hit the last item");
        // queryMoreChallengeAction();
        loadMoreChallenge();
      }
    }
  };
  /////////////////////////////////
  ///// Load more challenges onScrolling - useEffect action
  /////////////////////////
  useEffect(() => {
    // Attach the scroll event listener to your specific div
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    // Clean up the event listener on component unmount
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  });

  return (
    <RootLayout title={profileId}>
      <div className="default-section profile-section">
        <div className="default-section-container">
          <div className="default-section-nav">
            <div className="profile-show-sm">
              {/* <SideProfile /> */}
              <SideProfile />
            </div>
            <h3>Profile</h3>
          </div>
          <div className="default-section-body" ref={containerRef}>
            {/* ////////////////////////////////////////////////
               Profile Picture and banners
        //////////////////////////////////////////////// */}

            {otherUserDetail ? (
              <div className="user-image-banner">
                <div className="image-button">
                  <img src={otherUserDetail?.photoURL} alt="" />

                  {/* <button>Edit profile</button> */}
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
            {otherUserDetail ? (
              <div className="user-details">
                <h4>{otherUserDetail ? otherUserDetail?.displayName : null}</h4>
                <h4 className="username">
                  {otherUserDetail ? otherUserDetail?.username : null}
                </h4>

                {/* <div className="follow">
                  {challenges ? (
                    <p>
                      <span>{challenges.length} </span>Challenges Posted
                    </p>
                  ) : null}
                </div> */}
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
              <div ref={scrollRef}>
                <CircularProgress />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default ProfilePage;
