import { Route, Routes } from "react-router-dom";
// import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        {/* <Route exact path="/" element={<HomePage />}></Route> */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
