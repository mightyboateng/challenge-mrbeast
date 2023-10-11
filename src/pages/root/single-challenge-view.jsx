import React, { useState, useEffect } from "react";
import RootLayout from "../../components/RootLayout";
import { ArrowBack } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import VoteFunctionContainer from "../../components/VoteFunctionContainer";
import { useSelector } from "react-redux";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import { firestoreDb } from "../../firebase/firebase-config";
import { CircularProgress } from "@mui/material";
import { getChallengeDetail } from "../../reduxConfig/challenge-actions";

const SingleChallengeView = () => {
  const challengeList = useSelector((state) => state.challenges.challengeList);
  const [challengeDetail, setChallengeDetail] = useState(null);

  const { challengeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    const getResult = async () => {
      const result = await getChallengeDetail(
        challengeList,
        challengeId
      );
      setChallengeDetail(result);
    };

    getResult();
  }, [challengeId, challengeList]);

  return (
    <RootLayout>
      <div className="default-section challenge-view-section">
        <div className="default-section-container">
          <div className="default-section-nav view-post-nav">
            <ArrowBack onClick={() => navigate(-1)} className="mr-1 " />

            <h3>Challenge details</h3>
          </div>

          <div className="default-section-body">
            {challengeDetail === null ? (
              <div>
                <CircularProgress />
              </div>
            ) : (
              <div className="view-post-card">
                <VoteFunctionContainer
                  flexDirection="flex-column"
                  displayClass="hide-lg-vote"
                  challengeId={challengeId}
                />
                <div className="">
                  <div className="post-nav">
                    <img
                      className="post-ower-img"
                      src={challengeDetail.data().creatorPhoto}
                      alt="user-img"
                    />
                    <div className="user-detail">
                      <p>
                        {challengeDetail.data().challengeType}{" "}
                        <span>Posted by</span>
                        <Link
                          to={`/profile/${
                            challengeDetail.data().creatorUsername
                          }`}
                          className="owner-name"
                        >
                          {challengeDetail.data().creatorUsername}
                        </Link>
                      </p>
                      <span>
                        {new Timestamp(
                          challengeDetail.data().publishedAt.seconds,
                          challengeDetail.data().publishedAt.nanoseconds
                        )
                          .toDate()
                          .toDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="view-post-body">
                    <h3>{challengeDetail.data().challengeTitle}</h3>
                    <p>{challengeDetail.data().challengeDescription}</p>
                  </div>
                  <div className="post-footer">
                    <VoteFunctionContainer
                      flexDirection="flex-row"
                      displayClass="hide-sm-vote"
                      challengeId={challengeId}
                    />
                    {/* <div className="post-footer-item">
                    <Comment />
                    <span>22 Comments</span>
                  </div> */}
                    {/* <div className="post-footer-item">
                      <Share />
                      <span>Share</span>
                    </div> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default SingleChallengeView;
