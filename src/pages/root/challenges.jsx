import React, { useEffect, useRef } from "react";
import RootLayout from "../../components/RootLayout";
import PostCard from "../../components/PostCard";
import SideProfile from "../../components/SideProfile";

import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { firestoreDb } from "../../firebase/firebase-config";
import { useDispatch, useSelector } from "react-redux";
import {
  loadMoreChallengeList,
  loadFirstChallengeList,
  updateLastDoc,
} from "../../reduxConfig/slices/challengeSlice";
import { CircularProgress } from "@mui/material";

const ChallengesPage = () => {
  const scrollRef = useRef();
  const containerRef = useRef(null);
  const challengesList = useSelector((state) => state.challenges.challengeList);
  const challengeLastDoc = useSelector(
    (state) => state.challenges.challengeLastDoc
  );

  const dispatch = useDispatch();

  /////////////////////////////////
  ///// Initial Data loading
  /////////////////////////
  useEffect(() => {
    const queryChallengeSnap = async () => {
      const challengeRef = collection(firestoreDb, "challenges");
      const queryChallenge = query(
        challengeRef,
        orderBy("publishedAt", "desc"),
        // startAfter(challengeLastDoc || 0),
        limit(2)
      );
      const queryResult = await getDocs(queryChallenge);

      dispatch(loadFirstChallengeList(queryResult.docs));

      dispatch(updateLastDoc(queryResult.docs[queryResult.docs.length - 1]));
    };

    return () => {
      queryChallengeSnap();
    };
  }, [dispatch]);

  // ///////////////////
  //// Load more data
  ////////////////////////////////////
  const queryMoreChallengeAction = async () => {
    const challengeRef = collection(firestoreDb, "challenges");
    const queryChallenge = query(
      challengeRef,
      orderBy("publishedAt", "desc"),
      startAfter(challengeLastDoc || 0),
      limit(1)
    );
    const queryResult = await getDocs(queryChallenge);

    dispatch(loadMoreChallengeList(queryResult.docs));

    dispatch(updateLastDoc(queryResult.docs[queryResult.docs.length - 1]));
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
        // queryMoreChallengeAction();
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
    <RootLayout title="Challenges">
      <div className="default-section feed-section">
        <div className="default-section-container">
          <div className="default-section-nav">
            <div className="profile-show-sm">
              <SideProfile />
            </div>
            <h3>Challenges</h3>
          </div>
          <div className="default-section-body" ref={containerRef}>
            <div className="load-btn-container">
              <button>Load new challenges</button>
            </div>
            <div className="contents-container challenges-container">
              {challengesList.length !== 0 ? (
                challengesList.map((challenge, index) => (
                  <PostCard
                    key={index}
                    challengeId={challenge.id}
                    title={challenge.data().challengeTitle}
                    description={challenge.data().challengeDescription}
                    challengeType={challenge.data().challengeType}
                    creator={challenge.data().creatorUsername}
                    publishedAt={challenge.data().publishedAt}
                  />
                ))
              ) : (
                <div className="d-flex justify-content-center">
                  <CircularProgress />
                </div>
              )}
            </div>
            <button onClick={queryMoreChallengeAction}>
              Show more challenges
            </button>
            <div>Loading...</div>
            {challengeLastDoc ? (
              <div className="d-flex justify-content-center" ref={scrollRef}>
                <CircularProgress />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default ChallengesPage;
