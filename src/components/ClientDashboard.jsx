import { useState, useEffect } from "react";
import myApi from "../api/service";
const API_URL = import.meta.env.VITE_API_URL;
import OneTrainingCard from "./OneTrainingCard";

function ClientDashboard() {
  const [allTrainings, setAllTrainings] = useState([]);
  function getAllTrainings() {
    myApi
      .get(`${API_URL}/api/trainings`)
      .then((res) => setAllTrainings([...res.data]))
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getAllTrainings();
  }, []);

  return (
    <div className="client-dashboard">
      <h3>Hi Client</h3>;
      {allTrainings.map((training) => {
        return <OneTrainingCard key={training._id} training={training} />;
      })}
    </div>
  );
}

export default ClientDashboard;
