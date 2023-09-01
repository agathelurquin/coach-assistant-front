import { useContext } from "react";
import { UserContext } from "../context/AuthContext";
import CoachTrainings from "../components/CoachTrainings";
import ClientDashboard from "../components/ClientDashboard";

function DashboardPage() {
  const { user } = useContext(UserContext);

  console.log("hereeee", useContext(UserContext));
  return (
    <div className="page-content">
      <h2 className="page-title">Hey {user.name}</h2>

      {user.role === "coach" ? (
        <CoachTrainings coachId={user._id} />
      ) : (
        <ClientDashboard />
      )}
    </div>
  );
}

export default DashboardPage;

// Dashboard will receive the parameter coach or student
