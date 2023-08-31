import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/AuthContext";

function Navbar() {
  const { authenticateUser, isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("authToken");
    authenticateUser();
    navigate("/");
  }
  console.log("isloggedin", isLoggedIn);
  return isLoggedIn ? (
    <div className="loggedin-nav">
      <Link to="/">
        <img
          src="src/assets/img/default_avatar.png"
          className="logo-navbar"
          alt="home-logo"
        />
      </Link>
      {/* <Link to="/signup">Signup</Link>
            <Link to="/login">Log In</Link> */}
      <Link to="/dashboard">Dashboard</Link>
      <Link to="#">Explore</Link>
      <Link to="#">My Activity</Link>

      <Link to="/" onClick={handleLogout}>
        Signout
      </Link>
    </div>
  ) : (
    <div className="not-loggedin-nav">
      <Link to="/">
        <img
          src="src/assets/img/default_avatar.png"
          className="logo-navbar"
          alt="home-logo"
        />
      </Link>
      <Link to="/signup">Signup</Link>
      <Link to="/login">Log In</Link>
    </div>
  );
}

export default Navbar;
