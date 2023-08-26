import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Coach Assistant</h1>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
      <Link to="/login">
        <button>Log In</button>
      </Link>
    </div>
  );
}

export default HomePage;
