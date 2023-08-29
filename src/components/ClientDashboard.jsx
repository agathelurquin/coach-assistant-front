import { useState, useEffect } from "react";
import myApi from "../api/service";
const API_URL = import.meta.env.VITE_API_URL;
import OneTrainingCard from "./OneTrainingCard";
import OneBookingCard from "./OneBookingCard";

function ClientDashboard() {
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
      .then((res) => setClientBookings(res.data))
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getAllTrainings();
    getClientBookings();
  }, [clientBookings]);

  return (
    <div className="client-dashboard">
      <h2>Hi Client</h2>
      <h3>All Classes </h3>
      {allTrainings.map((training) => {
        return <OneTrainingCard key={training._id} training={training} />;
      })}
      <h3>Your Classes</h3>
      {clientBookings.map((booking) => {
        return <OneBookingCard oneBooking={booking} key={booking._id} />;
      })}
    </div>
  );
}

export default ClientDashboard;
