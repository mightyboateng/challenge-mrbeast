import React from 'react'
import RootLayout from '../../components/RootLayout';
import PostCard from '../../components/PostCard';
import SideProfile from '../../components/SideProfile';
import UserImage from '../../image/icons/iconamoon_profile.svg'

const ChallengesPage = () => {
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

              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <h1>Contents from users ++ ++</h1>
              <h1>Contents from users ++ ++</h1>
              <h1>Contents from users ++ ++</h1>
              <h1>Contents from users ++ ++</h1>
              <PostCard />

              <PostCard />
              <PostCard />
              <PostCard />
              <h1>Contents from users -- --</h1>
              <h1>Contents from users -- --</h1>
              <h1>Contents from users -- --</h1>
              <h1>Contents from users -- --</h1>
              <h1>End of Contents from users -- --</h1>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}

export default ChallengesPage;
