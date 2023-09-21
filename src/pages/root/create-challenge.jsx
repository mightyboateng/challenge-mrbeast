
import RootLayout from '../../components/RootLayout';

// import SideProfile from "@/components/SideProfile";
// import { db } from "@/firebase/firebase_config";

import { Public } from "@mui/icons-material";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { useRouter } from "next/navigation";
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SideProfile from '../../components/SideProfile';


const CreateChallengePage = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [mbType, setMbType] = useState("");
    const userDetail = useSelector((state) => state.user.userDetail);
    const navigate = useNavigate()

  return (
    <RootLayout>
      <div className="default-section create-section">
        <div className="default-section-container">
          <div className="default-section-nav">
            <div className="profile-show-sm">
              <SideProfile />
            </div>
            <h3>Create a Challenge</h3>
          </div>
          <div className="default-section-body">
            <div className="create-card">
              <div className="card-body">
                <form>
                  <select onChange={(e) => setMbType(e.target.value)}>
                    <option value="mb/charity">mb/charity</option>
                    <option value="mb/gaming">mb/gaming</option>
                    <option value="mb/reacts">mb/reacts</option>
                    <option value="mb/philanthropy">mb/philanthropy</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <textarea
                    placeholder="A full detail of your challenge goes here"
                    autoFocus={true}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </form>

                <p>
                  <Public /> Everyone will see this challenge
                </p>
                <hr className="hr" />

                {userDetail == null ? (
                  <button onClick={() => navigate("/login")}>
                    Please login to submit a challenge
                  </button>
                ) : (
                <button>Post</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}

export default CreateChallengePage;
