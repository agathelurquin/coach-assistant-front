import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [activity, setActivity] = useState([]);
  const [error, setError] = useState("");

  const [role, setRole] = useState("student");

  function handleRoleSelect(e) {
    // console.log(e.target.value);
    // const selectedRole = roles.find((role) => role.value === e.target.value);
    // if (selectedRole) {
    //   setRole(selectedRole);
    // }
    setRole(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const userToCreate = { name, email, password, role };
    if (role === "coach") {
      userToCreate.description = description;
      userToCreate.activity = activity;
    }

    axios
      .post(`${API_URL}/auth/signup`, userToCreate)
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((e) => {
        if (e.response) {
          setError(e.response.data.message);
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        />
      </div>
      <div>
        <label htmlFor="role">You are:</label>
        <select name="role" id="role" onChange={handleRoleSelect} value={role}>
          <option value={role}>Student</option>
          <option value={role}>Coach</option>
        </select>
        {role === "coach" && (
          <>
            <div>
              <label htmlFor="description">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
              />
            </div>
            <div>
              <label htmlFor="activity">Activity</label>
              <input
                type="text"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                id="activity"
              />
            </div>
          </>
        )}
      </div>
      {error && <p>{error}</p>}
      <button>Sign Up</button>
    </form>
  );
}

export default SignupPage;
