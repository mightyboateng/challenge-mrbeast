import React from 'react'
import RootLayout from '../../components/RootLayout'
import MrBeastVideoPostCard from '../../components/MrBeastVideoPostCard'
import SideProfile from '../../components/SideProfile';
import UserImg from "../../image/icons/iconamoon_profile.svg";

const MrBeastPage = () => {
  return (
    <RootLayout>
      <div className="default-section profile-section">
        <div className="default-section-container">
          <div className="default-section-nav">
            <div className="profile-show-sm">
              <SideProfile />
            </div>
            <h3>Mr Beast</h3>
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
              <div className="follow">
                {/* <p>
                <span>184M </span>Subscribers
              </p>
              <p>
                <span>870 </span>Videos 
              </p>*/}
                <p>
                  Let Mrbeast and his team know which videos are best and which
                  videos are shit. <span>Up-vote</span> or{" "}
                  <span>Down-vote</span> Mr beast videos.
                </p>
              </div>
            </div>

            {/* ////////////////////////////////////////////////
                User Post & Groups & Review
        //////////////////////////////////////////////// */}
            <div className="post-group-container">
              <MrBeastVideoPostCard />
              <MrBeastVideoPostCard />
              <MrBeastVideoPostCard />
              <MrBeastVideoPostCard />
              <MrBeastVideoPostCard />
              <MrBeastVideoPostCard />
              <MrBeastVideoPostCard />
              <MrBeastVideoPostCard />
              <MrBeastVideoPostCard />
              <MrBeastVideoPostCard />
              <MrBeastVideoPostCard />
              <MrBeastVideoPostCard />
              <MrBeastVideoPostCard />
              <MrBeastVideoPostCard />
              <MrBeastVideoPostCard />
              <MrBeastVideoPostCard />
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}

export default MrBeastPage
