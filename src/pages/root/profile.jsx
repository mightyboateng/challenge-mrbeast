import React from 'react'
import RootLayout from '../../components/RootLayout'
import PostCard from '../../components/PostCard';
import SideProfile from '../../components/SideProfile';

import UserImg from "../../image/icons/iconamoon_profile.svg";
// import SideProfile from "../SideProfile";
// import PostCard from "../PostCard";

const ProfilePage = () => {
  return (
    <RootLayout>
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
            <div className="user-image-banner">
              <div className="image-button">
                <img src={UserImg} alt="user-img" />
                {/* <button>Edit profile</button> */}
              </div>
            </div>

            {/* ////////////////////////////////////////////////
                User Details Here
        //////////////////////////////////////////////// */}
            <div className="user-details">
              <h4>
                Michael Adams Michael Adams Michael Adams Michael Adams Michael
                Adams
              </h4>
              <h4 className="username">@mighty_mike</h4>

              <div className="follow">
                <p>
                  <span>435 </span>Challenges Posted
                </p>
              </div>
            </div>

            {/* ////////////////////////////////////////////////
                User Post & Groups & Review
        //////////////////////////////////////////////// */}
            <div className="post-group-container">
              <div className="post-group-body">
                <div>
                  <PostCard />
                  <PostCard />
                  <PostCard/>
                  <PostCard />
                  <PostCard />
                  <PostCard />
                  <PostCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}

export default ProfilePage
