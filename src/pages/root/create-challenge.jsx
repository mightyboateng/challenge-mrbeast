import RootLayout from "../../components/RootLayout";
import { Public } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import SideProfile from "../../components/SideProfile";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestoreDb } from "../../firebase/firebase-config";

const CreateChallengePage = () => {
  const userDetail = useSelector((state) => state.user.userDetail);
  const navigate = useNavigate();

  const handleChallengeSubmit = async (e) => {
    e.preventDefault();

    const challengeRef = collection(firestoreDb, "challenges");
    await addDoc(challengeRef, {
      challengeTitle: e.target.title.value,
      challengeDescription: e.target.description.value,
      challengeType: e.target.channel.value,
      creator: userDetail.uid,
      creatorUsername: userDetail.username,
      publishedAt: serverTimestamp(),
    }).then(() => {
      navigate("/challenges");
      // window.open('/challenges')
    });
  };

  return (
    <RootLayout title="Submit a challenge">
      <div className="create-section">
        <div className="default-section-nav">
          <div className="profile-show-sm">
            <SideProfile />
          </div>
          <h3>Create a Challenge</h3>
        </div>
        <div className="default-section-body">
          <div className="create-card">
            <div className="card-body">
              <form onSubmit={handleChallengeSubmit}>
                <select name="channel">
                  <option value="mb/charity">mb/charity</option>
                  <option value="mb/gaming">mb/gaming</option>
                  <option value="mb/reacts">mb/reacts</option>
                  <option value="mb/philanthropy">mb/philanthropy</option>
                </select>
                <input type="text" placeholder="Title" name="title" />
                <textarea
                  placeholder="A full detail of your challenge goes here"
                  autoFocus={true}
                  name="description"
                ></textarea>

                <p>
                  <Public /> Everyone will see this challenge
                </p>
                <hr className="hr" />

                {userDetail == null ? (
                  <button onClick={() => navigate("/login")}>
                    Login to submit a challenge
                  </button>
                ) : (
                  <button>Post</button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default CreateChallengePage;
