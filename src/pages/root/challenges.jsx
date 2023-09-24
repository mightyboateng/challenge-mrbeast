import React, { useEffect, useRef, useState } from "react";
import RootLayout from "../../components/RootLayout";
import PostCard from "../../components/PostCard";
import SideProfile from "../../components/SideProfile";
import UserImage from "../../image/icons/iconamoon_profile.svg";

import {
  Timestamp,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
} from "firebase/firestore";
import { firestoreDb } from "../../firebase/firebase-config";

const ChallengesPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [challengesId, setChallengesId] = useState([]);
  const [lastDoc, setLastDoc] = useState("");
  const scrollRef = useRef();
  const [scrollPosition, setScrollPosition] = useState(0);

  // useEffect(() => {
  //   const challengeRef = collection(firestoreDb, "challenges");
  //   const queryChallenge = query(
  //     challengeRef,
  //     orderBy("publishedAt", "desc"),
  //     limit(1)
  //   );

  //   const queryChallengeSnap = async () => {
  //     const queryResult = await getDocs(queryChallenge);

  //     setChallenges(
  //       queryResult.docs.map((challengeDet) => ({
  //         id: challengeDet.id,
  //         challengeTitle: challengeDet.data().challengeTitle,
  //         challengeDescription: challengeDet.data().challengeDescription,
  //         creatorUsername: challengeDet.data().creatorUsername,
  //         challengeType: challengeDet.data().challengeType,
  //         publishedAt: challengeDet.data().publishedAt,
  //       }))
  //     );
  //   };
  //   return () => {
  //     queryChallengeSnap();
  //   };
  // }, []);

  // useEffect(() => {
  //   const challengeRef = collection(db, "challenges");
  //   const queryChallenge = query(
  //     challengeRef,
  //     orderBy("publishedAt", "desc"),
  //     limit(2)
  //   );

  //   const queryChallengeSnap = async () => {
  //     const queryResult = await getDocs(queryChallenge);

  //     setChallenges(
  //       queryResult.docs.map((challengeDet) => ({
  //         id: challengeDet.id,
  //         challengeTitle: challengeDet.data().challengeTitle,
  //         challengeDescription: challengeDet.data().challengeDescription,
  //         creatorUsername: challengeDet.data().creatorUsername,
  //         challengeType: challengeDet.data().challengeType,
  //         publishedAt: challengeDet.data().publishedAt,
  //       }))
  //     );
  //   };
  //   return () => {
  //     queryChallengeSnap();
  //   };
  // }, []);

  // const queryMoreChallengeAction = async () => {
  //   const challengeRef = collection(firestoreDb, "challenges");
  //   const queryChallenge = query(
  //     challengeRef,
  //     orderBy("publishedAt", "desc"),
  //     limit(2)
  //   );
  //   const queryResult = await getDocs(queryChallenge);

  //   setChallenges((oldValue) => [
  //     ...oldValue,
  //     queryResult.docs.map((challengeDet) => ({
  //       id: challengeDet.id,
  //       challengeTitle: challengeDet.data().challengeTitle,
  //       challengeDescription: challengeDet.data().challengeDescription,
  //       creatorUsername: challengeDet.data().creatorUsername,
  //       challengeType: challengeDet.data().challengeType,
  //       publishedAt: challengeDet.data().publishedAt,
  //     })),
  //   ]);

  //    setLastDoc(queryResult.docs[queryResult.docs.length - 1]);

  //   // console.log("last man ", );
  // };

  const queryChallengeSnapAction = async () => {
    const challengeRef = collection(firestoreDb, "challenges");
    const queryChallenge = query(
      challengeRef,
      orderBy("publishedAt", "desc"),
      startAfter(lastDoc || 0),
      limit(2)
    );
    const queryResult = await getDocs(queryChallenge);

    queryResult.docs.map((doc) => {
      // console.log("Result ", doc.data())
      setChallenges((oldValue) => [...oldValue,  doc.data()]);
      setChallengesId((oldValue) => [...oldValue, doc.id]);

    });

    setLastDoc(queryResult.docs[queryResult.docs.length - 1]);
    // console.log("last man ", );
  };


  useEffect(() => {
    const queryChallengeSnap = async () => {
      const challengeRef = collection(firestoreDb, "challenges");
      const queryChallenge = query(
        challengeRef,
        orderBy("publishedAt", "desc"),

        limit(2)
      );
      const queryResult = await getDocs(queryChallenge);

      queryResult.docs.map((doc) => {
        // console.log("Result ", doc.data())
        setChallenges((oldValue) => [...oldValue, doc.data()]);
        setChallengesId((oldValue) => [...oldValue, doc.id]);
      });

      setLastDoc(queryResult.docs[queryResult.docs.length - 1]);
      // console.log("last man ", );
    };
    return () => {
      queryChallengeSnap();
    };
  }, []);

  useEffect(() => {
    // const challengeContainer = document.getElementById("challengesContainerId");
    // const challengeContain = window.document.querySelector(".contents-container");

    // if (challengeContain) {
    //   challengeContain.addEventListener("scroll", () => {
    //     console.log("Yes Yes");
    //   });
    // }
    // if (challengeContainer) {
    //   challengeContainer.addEventListener("scroll", () => {
    //     console.log("Yes Yes");
    //   });
    // }
    //   if(challengeContainer) {
    //  const triggerHeight = challengeContainer.scrollTop;

    //  console.log("trigger ", triggerHeight);
    //   }

    return () => {};
  });

  // window.document.addEventListener("scroll", () => {
  //   console.log("Yes Yes");
  // });

  // console.log("challenges ", challengesId);

  return (
    <RootLayout>
      <div className="default-section feed-section">
        <div className="default-section-container">
          <div className="default-section-nav">
            <div className="profile-show-sm">
              <SideProfile />
            </div>
            <h3>Challenges</h3>
          </div>
          <div className="default-section-body">
            <div className="load-btn-container">
              <button>Show new challenges</button>
            </div>
            <div
              className="contents-container challenges-container"
              id="challengesContainerId"
            >
              {/* <div className="user-feed-container">
                <div className='user-input'>
                  <img src={UserImage} alt="user-profile" />
                  <div className="input-field">
                    <span>
                      What do you want to tell mrbeast and his team on his next
                      video
                    </span>
                  </div>
                </div>
              </div> */}

              {challenges
                ? challenges.map((challenge, index) => (
                    <PostCard
                      key={index}
                      challengeId={challengesId[index]}
                      title={challenge.challengeTitle}
                      description={challenge.challengeDescription}
                      challengeType={challenge.challengeType}
                      creator={challenge.creatorUsername}
                      publishedAt={new Timestamp(
                        challenge.publishedAt.seconds,
                        challenge.publishedAt.nanoseconds
                      )
                        .toDate()
                        .toDateString()}
                    />
                  ))
                : null}
              
            </div>
            <button onClick={queryChallengeSnapAction}>
              Show more challenges
            </button>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default ChallengesPage;
