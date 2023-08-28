import { useContext } from "react";
import { UserContext } from "../context/AuthContext";
import CoachTrainings from "../components/CoachTrainings";

function DashboardPage() {
  const { user } = useContext(UserContext);

  console.log("hereeee", useContext(UserContext));
  return (
    <>
      <h2>Dashboard</h2>
      <p>{user.role}</p>

      {user.role === "coach" && <CoachTrainings />}
    </>
  );
}

export default DashboardPage;

// Dashboard will receive the parameter coach or student
