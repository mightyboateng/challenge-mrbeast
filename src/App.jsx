import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing";
import React from "react";
import ChallengesPage from "./pages/root/challenges";
import CreateChallengePage from "./pages/root/create-challenge";
import ProfilePage from "./pages/root/profile";
import MrBeastPage from "./pages/root/mr-beast";
import SingleChallengeView from "./pages/root/single-challenge-view";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import BigNotificationContainer from "./components/BigNotificationContainer";
import { useThemeData } from "./components/ThemeDataContext";

function App() {

  const {themeData } = useThemeData()

  return (
    <div className="App" data-theme={themeData}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/challenges" element={<ChallengesPage />} />
          <Route
            path="/challenges/:challengeId"
            element={<SingleChallengeView />}
          />
          <Route path="/mr-beast" element={<MrBeastPage />} />
          <Route path="/create-challenge" element={<CreateChallengePage />} />
          <Route path="/profile/:profileId" element={<ProfilePage />} />
        </Routes>
      <BigNotificationContainer />
      </BrowserRouter>

    </div>
  );
}

export default App;
