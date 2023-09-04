import { useContext, useState } from "react";
import { UserContext } from "../context/AuthContext";
import CoachTrainings from "../components/CoachTrainings";
import ClientDashboard from "../components/ClientDashboard";
import myApi from "../api/service";
const API_URL = import.meta.env.VITE_API_URL;

function DashboardPage() {
  const { user } = useContext(UserContext);

  const [avatar, setAvatar] = useState("");

  myApi
    .get(`${API_URL}/api/users/${user._id}`)
    .then((res) => {
      console.log(res.data);
      setAvatar(res.data.avatar);
    })
    .catch((e) => console.log(e));

  // getAvatar();

  console.log("hereeee", useContext(UserContext));
  return (
    <div className="page-content">
      <div className="dashboad-header">
        <img
          src={
            user.role === "coach"
              ? "src/assets/img/default-coach-avatar.jpg"
              : "src/assets/img/default-client-avatar.jpg"
          }
          className="user-avatar"
          alt="user-avatar"
        />
        <h2 className="page-title">
          Hey <br />
          {user.name}
        </h2>
      </div>

      {user.role === "coach" ? (
        <CoachTrainings coachId={user._id} />
      ) : (
        <ClientDashboard coachAvatar={avatar} />
      )}
    </div>
  );
}

export default DashboardPage;

// Dashboard will receive the parameter coach or student
