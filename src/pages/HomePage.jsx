import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <div className="hero-banner">
        <div className="overlay">
          <div className="banner-content">
            <h1>
              Coach <br />
              Assistant
            </h1>
            <div className="banner-buttons">
              <Link to="/signup">
                <button className="home-button">Sign Up</button>
              </Link>
              <Link to="/login">
                <button className="home-button">Log In</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
