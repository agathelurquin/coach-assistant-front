import { useState, useEffect } from "react";
import myApi from "../api/service";
const API_URL = import.meta.env.VITE_API_URL;
import OneTrainingCard from "./OneTrainingCard";

import { UserContext } from "../context/AuthContext";
import { useContext } from "react";

function ClientDashboard() {
  const { user } = useContext(UserContext);
  const [clientBookings, setClientBookings] = useState([]);
  const [allTrainings, setAllTrainings] = useState([]);
  function getAllTrainings() {
    myApi
      .get(`${API_URL}/api/trainings`)
      .then((res) => setAllTrainings([...res.data]))
      .catch((e) => console.log(e));
  }

  function getClientBookings() {
    myApi
      .get(`${API_URL}/api/bookings/client`)
      .then((res) => {
        console.log("our users bookings= ", user._id, res);
        setClientBookings(res.data);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getAllTrainings();
    getClientBookings();
  }, []);

  return (
    <div className="client-dashboard">
      <h3>Hi Client</h3>;
      {allTrainings.map((training) => {
        return <OneTrainingCard key={training._id} training={training} />;
      })}
      <h3>Your Classes</h3>
      {clientBookings.map((booking) => {
        return (
          <div className="booking-card" key={booking._id}>
            <p>{booking._id}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ClientDashboard;
