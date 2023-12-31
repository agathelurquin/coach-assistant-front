import { useContext } from "react";
import { UserContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function IsLoggedIn() {
  const { isLoggedIn, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isLoggedIn) {
    return <Navigate to="login" />;
  }

  return <Outlet />;
}

export default IsLoggedIn;
