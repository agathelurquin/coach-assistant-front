import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div>
        <Link to="/">
          <img src="src/assets/img/default_avatar.png" alt="home-logo" />
        </Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Log In</Link>
      </div>
    </>
  );
}

export default Navbar;
