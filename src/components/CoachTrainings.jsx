import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import myApi from "../api/service";
const API_URL = import.meta.env.VITE_API_URL;
import OneTraining from "../components/OneTraining";

function CoachTrainings() {
  const [coachTrainings, setCoachTrainings] = useState([]);

  useEffect(() => {
    myApi
      .get(`${API_URL}/api/trainings`)
      .then((res) => {
        setCoachTrainings([...res.data]);
      })
      .catch((e) => console.log(e));
  }, []);

  // console.log(coachTrainings);
  return (
    <div className="dashboard-action">
      <h3>My Trainings</h3>
      <Link to="/trainings">Add New Training Slot</Link>
      {coachTrainings.map((training) => {
        return (
          <OneTraining key={training._id} training={training} />
          // <div key={training._id}>
          //   <h4>{training.name}</h4>
          //   <p>{training.description}</p>
          // </div>
        );
      })}
    </div>
  );
}
export default CoachTrainings;
