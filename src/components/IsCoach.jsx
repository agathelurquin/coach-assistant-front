import { useContext } from "react";
import { UserContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function IsCoach() {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (user.role !== "coach") {
    return <Navigate to="/dashboard" />;
  }
  return <Outlet />;
}

export default IsCoach;
