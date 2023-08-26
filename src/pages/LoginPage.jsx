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
        authenticateUser();
        navigate("/dashboard");
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
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />
        </div>
        {error && <p>{error}</p>}
        <button>Login</button>
      </form>
    </>
  );
}

export default LoginPage;
