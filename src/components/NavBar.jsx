import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/AuthContext";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  const { authenticateUser, isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    console.log("Toggle function called");
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    console.log("useEffect executed");
    const closeMobileMenu = () => {
      setIsMobileMenuOpen(true);
    };
    window.addEventListener("resize", closeMobileMenu);
    return () => {
      window.removeEventListener("resize", closeMobileMenu);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("authToken");
    authenticateUser();
    navigate("/");
  }

  return (
    <div className={`navbar ${isMobileMenuOpen ? "open" : ""}`}>
      <div className="logo">
        <Link to="/">
          <img
            src="src/assets/img/default_avatar.png"
            className="logo-navbar"
            alt="home-logo"
          />
        </Link>
      </div>
      {isLoggedIn ? (
        <div className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="#">Explore</Link>
            </li>
            <li>
              <Link to="#">My Activity</Link>
            </li>
            <li>
              <Link to="/" onClick={handleLogout}>
                Signout
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>{" "}
            </li>
          </ul>
        </div>
      )}
      <button className="navbar-mobile-toggle " onClick={toggleMobileMenu}>
        <FontAwesomeIcon icon={faBars} />
      </button>
    </div>
  );
}

export default Navbar;
