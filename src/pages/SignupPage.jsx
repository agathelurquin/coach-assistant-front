import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const API_URL = import.meta.env.VITE_API_URL;

function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [activity, setActivity] = useState([]);
  const [error, setError] = useState("");
  const [roles] = useState([
    {
      label: "student",
      value: "student",
    },
    {
      label: "coach",
      value: "coach",
      field: (
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
      ),
    },
  ]);

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
    <div className="signup-in-page">
      <div className="page-content">
        <h2>SIGN UP</h2>
        <form onSubmit={handleSubmit} className="signup-in-form">
          <div className="form-input">
            <label htmlFor="name" className="input-label"></label>
            <input
              className="form-field"
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
            />
          </div>
          <div className="form-input">
            <label className="input-label" htmlFor="email"></label>
            <input
              placeholder="email"
              className="form-field"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
          </div>
          <div className="form-input">
            <label className="input-label" htmlFor="password"></label>
            <input
              placeholder="password"
              className="form-field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />
          </div>
          <div className="form-input role-input">
            <h3>You are:</h3>
            <div className="role-input-select">
              <label className="input-label" htmlFor="role"></label>
              <select
                name="role"
                id="role"
                onChange={handleRoleSelect}
                value={role}
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
                {/* <option value={role}>Student</option>
          <option value={role}>Coach</option> */}
              </select>
              {role === "coach" && (
                <>
                  <div className="form-input">
                    <label
                      className="input-label"
                      htmlFor="description"
                    ></label>
                    <input
                      placeholder="Description"
                      className="form-field"
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      id="description"
                    />
                  </div>
                  <div className="form-input">
                    <label className="input-label" htmlFor="activity"></label>
                    <input
                      placeholder="Activity"
                      className="form-field"
                      type="text"
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                      id="activity"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          {error && <p>{error}</p>}
          <button className="signup-in-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
