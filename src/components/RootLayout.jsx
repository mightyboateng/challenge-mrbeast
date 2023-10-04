import React, { useEffect, useState } from "react";
import LeftSidebar from "./LeftSidebar";
import { useDispatch, useSelector } from "react-redux";
import { auth, getSpecificUser } from "../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import LoadingComponent from "./Loading";
import { loginUser } from "../reduxConfig/slices/userSlice";
import { getDoc } from "firebase/firestore";
import { Helmet } from "react-helmet";

const RootLayout = ({ children, title, description }) => {
  const userDetail = useSelector((state) => state.user.userDetail);
  const dispatch = useDispatch();

  const [pageLoading, setPageLoading] = useState(true);

  async function getUserDetailFromFirestore(userUid) {
    const docRef = getSpecificUser(userUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      dispatch(loginUser(docSnap.data()));
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        getUserDetailFromFirestore(auth.currentUser.uid);

        if (userDetail !== null) {
          setPageLoading(false);
        }
      } else {
        setPageLoading(false);
      }
    });
  });

  // const handleScrollController = (e) => {
  //   const element = e.target;
  //   const isAtBottom =
  //     element.scrollHeight - element.scrollTop === element.clientHeight;

  //   // console.log("Scrolling from the mother ", isAtBottom);
  // };

  return pageLoading ? (
    <LoadingComponent />
  ) : (
    <main>
      <Helmet>
        <title>
          {title ? `${title} | ChallengeMrBeast` : "ChallengeMrBeast"}
        </title>
        <meta name="description" content="Reaching out to millions" />
      </Helmet>
      <div className="custom-container home-section">
        {/* //////////////////////////////////////////
                    Sidebar -- Bottom Navbar
        /////////////////////////////////////////////// */}
        <LeftSidebar />

        {/* //////////////////////////////////////////
                   Content base section
        /////////////////////////////////////////////// */}
        <div className="content-section" >
          {children}
          {/* <LeftSidebar hideSM="hide-lg" /> */}
        </div>
      </div>
    </main>
  );
};

export default RootLayout;
