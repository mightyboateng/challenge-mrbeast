import React, { useEffect } from "react";
import RootLayout from "../../components/RootLayout";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getUserDetails, loadUserChallenge } from "../../reduxConfig/actions/profile-actions";
import ProfilePageBody from "../../components/ProfilePageBody";

const ProfilePage = () => {
  const { profileId } = useParams();
  const userDetail = useSelector((state) => state.user.userDetail);
  const otherProfileDetail = useSelector((state) => state.user.otherProfile);
  const profileChallengeList = useSelector(
    (state) => state.challenges.profileChallengeList
  );
  const dispatch = useDispatch();

  useEffect(() => {

    const getUserInfo = async () => {
      getUserDetails(profileId, userDetail, otherProfileDetail, dispatch);
    };

    return () => {
      getUserInfo();
      loadUserChallenge(profileId, dispatch)
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, profileId]);


  return (
    <RootLayout title={profileId}>
      {userDetail?.username === profileId ? (
        <ProfilePageBody
          profileId={profileId}
          userDetail={userDetail}
          profileChallengeList={profileChallengeList}
        />
      ) : (
        <ProfilePageBody
          profileId={profileId}
          userDetail={otherProfileDetail}
          profileChallengeList={profileChallengeList}
        />
      )}
    </RootLayout>
  );
};

export default ProfilePage;
