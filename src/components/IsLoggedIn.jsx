import { useContext } from "react";
import { UserContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function IsLoggedIn() {
  const { user, isLoggedIn, isLoading } = useContext(UserContext);

  if (isLoading) {
    console.log("loading");

    return <div>Loading...</div>;
  }
  if (!isLoggedIn) {
    console.log(user, "redirected form component isloggedin");

    return <Navigate to="login" />;
  }

  return <Outlet />;
}

export default IsLoggedIn;
