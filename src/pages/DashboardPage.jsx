import { useContext } from "react";
import { UserContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function DashboardPage() {
  const { user } = useContext(UserContext);

  console.log("hereeee", useContext(UserContext));
  return (
    <>
      <h2>Dashboard</h2>
      <p>{user.role}</p>

      {user.role === "coach" && (
        <div className="dashboard-action">
          <h3>My Training</h3>
          <Link to="/trainings">Add New Training Slot</Link>
        </div>
      )}
    </>
  );
}

export default DashboardPage;

// Dashboard will receive the parameter coach or student
