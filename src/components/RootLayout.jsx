import React from "react";
import LeftSidebar from "./LeftSidebar";
import { useSelector } from "react-redux";

const RootLayout = ({ children }) => {

  const userDetail = useSelector((state)=>state.user.userDetail)
  return (
    <main>
      <div className="custom-container home-section">
        {/* //////////////////////////////////////////
                    Sidebar -- Bottom Navbar
        /////////////////////////////////////////////// */}
        {/* <LeftSidebar /> */}
        <LeftSidebar />

        {/* //////////////////////////////////////////
                   Content base section
        /////////////////////////////////////////////// */}
        <div className="content-section">{children}</div>
      </div>
    </main>
  );
};

export default RootLayout;
