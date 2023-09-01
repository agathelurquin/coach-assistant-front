import { useState, useContext } from "react";
import { UserContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { authenticateUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const userToLogin = { email, password };
    axios
      .post(`${API_URL}/auth/login`, userToLogin)
      .then((response) => {
        console.log(response);
        localStorage.setItem("authToken", response.data.authToken);
        authenticateUser().then(() => navigate("/dashboard"));
      })
      .catch((e) => {
        if (error.response) {
          setError(e.response.data.authToken);
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      });
  }

  return (
    <div className="signup-in-page">
      <div className="page-content">
        <h2>LOG IN</h2>

        <form onSubmit={handleSubmit} className="signup-in-form">
          <div className="form-input">
            <label className="form-label" htmlFor="email"></label>
            <input
              className="form-field"
              placeholder="Email"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
          </div>
          <div className="form-input">
            <label className="form-label" htmlFor="password"></label>
            <input
              className="form-field"
              placeholder="Password 🤫"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />
          </div>
          {error && <p>{error}</p>}
          <button className="signup-in-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
