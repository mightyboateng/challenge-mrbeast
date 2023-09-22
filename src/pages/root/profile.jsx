import React, { useEffect, useState } from "react";
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
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
// import SideProfile from "../SideProfile";
// import PostCard from "../PostCard";

const ProfilePage = () => {
  // const {pathname} = useLocation
  const { profileId } = useParams();

  const userDetail = useSelector((state) => state.user.userDetail);
  const [otherUserDetail, setOtherUserDetail] = useState();
  const [challenges, setChallenges] = useState([]);

  // console.log("user id ", profileId);

  // const getUserDetails = () => {
  //   const userRef = collection(db, "users");

  //   const queryUser = query(userRef, where("username", "==", profileId));

  //   onSnapshot(queryUser, (doc) => {

  //   });
  // };

  useEffect(() => {
    ////////////////////////////////
    // Query for user details
    ////////////////////////
    // if (userDetail) {
    if (userDetail?.username === profileId) {
      // setOtherUserDetail(userDetail);
      console.log("users are the same");
    } else {
      const userRef = collection(db, "users");
      const queryUser = query(userRef, where("username", "==", profileId));
      // onSnapshot(queryUser, (doc) => {
      //   setOtherUserDetail(
      //     doc.docs.map((userDet) => ({
      //       id: userDet.id,
      //       username: userDet.data().username,
      //       displayName: userDet.data().displayName,
      //       photoURL:userDet.data().photoURL
      //     }))
      //   );
      // });

      const queryUserSnap = async () => {
        const result = await getDocs(queryUser);
        setOtherUserDetail(result.docs[0].data());
      };

      queryUserSnap();
    }
    ////////////////////////////////
    // Query for user challenges
    ////////////////////////
    const challengeRef = collection(db, "challenges");
    const queryChallenge = query(
      challengeRef,
      where("creatorUsername", "==", profileId),
      orderBy("publishedAt", "desc"),limit(1)
    );
    // onSnapshot(queryChallenge, (doc) => {
    //   setChallenges(
    //     doc.docs.map((challengeDet) => ({
    //       id: challengeDet.id,
    //       challengeTitle: challengeDet.data().challengeTitle,
    //       challengeDescription: challengeDet.data().challengeDescription,
    //       creatorUsername: challengeDet.data().creatorUsername,
    //       challengeType: challengeDet.data().challengeType,
    //       publishedAt: challengeDet.data().publishedAt,
    //     }))
    //   );
    // });
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
  }, [profileId, userDetail]);

  // console.log("challenges", challenges[0])

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
          <div className="default-section-body">
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
            ) : null}

            {/* ////////////////////////////////////////////////
                User Details Here
        //////////////////////////////////////////////// */}
            {otherUserDetail ? (
              <div className="user-details">
                <h4>{otherUserDetail ? otherUserDetail?.displayName : null}</h4>
                <h4 className="username">
                  {otherUserDetail ? otherUserDetail?.username : null}
                </h4>

                <div className="follow">
                  {challenges ? (
                    <p>
                      <span>{challenges.length} </span>Challenges Posted
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}

            {/* ////////////////////////////////////////////////
                User Post & Groups & Review
        //////////////////////////////////////////////// */}
            <div className="post-group-container">
              <div className="post-group-body">
                <div>
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
                  {/* <PostCard />
                  <PostCard />
                  <PostCard />
                  <PostCard />
                  <PostCard />
                  <PostCard /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default ProfilePage;
