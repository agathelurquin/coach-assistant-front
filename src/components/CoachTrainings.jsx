import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import myApi from "../api/service";
const API_URL = import.meta.env.VITE_API_URL;
import OneTrainingCard from "./OneTrainingCard";

function CoachTrainings(props) {
  const coachId = props.coachId;
  console.log("our coach Id is: ", coachId);
  const [coachTrainings, setCoachTrainings] = useState([]);

  useEffect(() => {
    getAllTrainings();
  }, []);

  function getAllTrainings() {
    myApi
      .get(`${API_URL}/api/trainings/coach/${coachId}`)
      .then((res) => {
        console.log("our response: ", res.data);
        setCoachTrainings([...res.data]);
      })
      .catch((e) => console.log(e));
  }
  // console.log(coachTrainings);
  return (
    <div className="dashboard-action">
      <h3>My Trainings</h3>
      <Link to="/trainings">Add New Training Slot</Link>
      {coachTrainings.map((training) => {
        return (
          <OneTrainingCard
            key={training._id}
            training={training}
            getAllTrainings={getAllTrainings}
          />
        );
      })}
    </div>
  );
}
export default CoachTrainings;
