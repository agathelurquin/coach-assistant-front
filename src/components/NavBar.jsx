import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/AuthContext";

function Navbar() {
  const { authenticateUser } = useContext(UserContext);
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("authToken");
    authenticateUser();
    navigate("/");
  }
  return (
    <>
      <div>
        <Link to="/">
          <img src="src/assets/img/default_avatar.png" alt="home-logo" />
        </Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Log In</Link>
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/" onClick={handleLogout}>
          Signout
        </Link>
      </div>
    </>
  );
}

export default Navbar;
