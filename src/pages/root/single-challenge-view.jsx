import React from 'react'
import RootLayout from '../../components/RootLayout';
import { ArrowBackIos, Share, Comment } from "@mui/icons-material";
// import Link from "next/link";
import { Link } from 'react-router-dom';
// import Image from "next/image";
// import VoteFunctionContainer from "@/components/VoteFunctionContainer";
import VoteFunctionContainer from '../../components/VoteFunctionContainer';
import UserImage from '../../image/icons/iconamoon_profile.svg'


const SingleChallengeView = () => {
  return (
    <RootLayout>
      <div className="default-section challenge-view-section">
        <div className="default-section-container">
          <div className="default-section-nav">
            <Link to="/challenges">
              <ArrowBackIos />
            </Link>
            <h3>Challenge details</h3>
          </div>
          <div className="default-section-body">
            <div className="view-post-card">
              <VoteFunctionContainer
                flexDirection="flex-column"
                displayClass="hide-lg-vote"
              />
              <div className="">
                <div className="post-nav">
                  <img className='post-ower-img' src={UserImage} alt="user-img" />
                  <div className="user-detail">
                    <p>
                      mb/charity <span>Posted by</span>
                      <Link to="/profile/nana-kwame" className="owner-name">
                        Michael Nana Adams
                      </Link>
                    </p>
                    <span>1 day ago</span>
                  </div>
                </div>
                <div className="view-post-body">
                  <h3>Master the Art of Prompting with Mighty Mike</h3>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
                <div className="post-footer">
                  <VoteFunctionContainer
                    flexDirection="flex-row"
                    displayClass="hide-sm-vote"
                  />
                  {/* <div className="post-footer-item">
                    <Comment />
                    <span>22 Comments</span>
                  </div> */}
                  <div className="post-footer-item">
                    <Share />
                    <span>Share</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}

export default SingleChallengeView;
