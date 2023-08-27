import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsLoggedIn from "./components/IsLoggedIn";
import IsCoach from "./components/IsCoach";
import DashboardPage from "./pages/DashboardPage.jsx";
import NewTrainingPage from "./pages/NewTrainingPage";

import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<IsLoggedIn />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/trainings" element={<IsCoach />}>
            <Route path="/trainings" element={<NewTrainingPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
