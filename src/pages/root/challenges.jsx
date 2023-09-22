import React, { useEffect, useState } from "react";
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
import { db } from "../../firebase/firebase-config";

const ChallengesPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);

  useEffect(() => {
    const challengeRef = collection(db, "challenges");
    const queryChallenge = query(
      challengeRef,
      orderBy("publishedAt", "desc"),
      limit(2)
    );

    const queryChallengeSnap = async () => {
      const queryResult = await getDocs(queryChallenge);

      setChallenges(
        queryResult.docs.map((challengeDet) => ({
          id: challengeDet.id,
          challengeTitle: challengeDet.data().challengeTitle,
          challengeDescription: challengeDet.data().challengeDescription,
          creatorUsername: challengeDet.data().creatorUsername,
          challengeType: challengeDet.data().challengeType,
          publishedAt: challengeDet.data().publishedAt,
        }))
      );
    };
    return () => {
      queryChallengeSnap();
    };
  }, []);

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
            <div className="contents-container">
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
                      challengeId={challenge.id}
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
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default ChallengesPage;
