import React, { useEffect } from "react";
import RootLayout from "../../components/RootLayout";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  getUserDetails,
  loadUserChallenge,
} from "../../reduxConfig/actions/profile-actions";
import ProfilePageBody from "../../components/ProfilePageBody";

const ProfilePage = () => {
  const { profileId } = useParams();
  const userDetail = useSelector((state) => state.user.userDetail);
  const otherProfileDetail = useSelector((state) => state.user.otherProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserInfo = async () => {
      getUserDetails(profileId, userDetail, dispatch);
    };
    getUserInfo();
  }, [dispatch, profileId, userDetail]);

  return (
    <RootLayout title={profileId}>
      {userDetail?.username === profileId ? (
        <ProfilePageBody profileId={profileId} userDetail={userDetail} />
      ) : (
        <ProfilePageBody
          profileId={profileId}
          userDetail={otherProfileDetail}
        />
      )}
    </RootLayout>
  );
};

export default ProfilePage;
