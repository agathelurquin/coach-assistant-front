import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <div className="hero-banner">
        <h1>Coach Assistant</h1>
        <Link to="/signup">
          <button className="home-button">Sign Up</button>
        </Link>
        <Link to="/login">
          <button className="home-button">Log In</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
