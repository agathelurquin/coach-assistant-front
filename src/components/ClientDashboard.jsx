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
      .then((res) => {
        setAllTrainings([...res.data]);
      })
      .catch((e) => console.log(e));
  }

  function getClientBookings() {
    myApi
      .get(`${API_URL}/api/bookings/client`)
      .then((res) => setClientBookings(res.data))
      .catch((e) => console.log(e));
  }

  // const allowBookingAction = (training) => {
  //   myApi
  //     .get(`${API_URL}/api/bookings/client/${training._id}`)
  //     .then((res) => {
  //       if (res.data.length > 0) {
  //         setIsBooked(true);
  //         console.log("there is a booking already", res.data);
  //       } else {
  //         setIsBooked(false);
  //         console.log("no booking", res.data);
  //       }
  //     })
  //     .catch((e) => console.log(e));
  // };

  const trainingsBooked = [];
  function findBookedTrainings() {
    clientBookings.forEach((booking) => {
      trainingsBooked.push(booking.training._id);
    });
    console.log("trainings booked", trainingsBooked);
    return trainingsBooked;
  }

  useEffect(() => {
    getAllTrainings();
    getClientBookings();
  }, []);
  //=====================================================================
  // I just removed client bookings ffrom depedencies
  //=====================================================================

  return (
    <div className="client-dashboard">
      <h2>Hi Client</h2>
      <h3>All Classes </h3>
      {allTrainings.map((training) => {
        findBookedTrainings();
        let isBooked = false;

        return (
          <div className="training-card" key={training._id}>
            {trainingsBooked.includes(training._id)
              ? (isBooked = true)
              : (isBooked = false)}
            <OneTrainingCard training={training} isBooked={isBooked} />;
          </div>
        );
      })}
      <h3>YOUR CLASSES </h3>
      {clientBookings.map((booking) => {
        return <OneBookingCard oneBooking={booking} key={booking._id} />;
      })}
    </div>
  );
}

export default ClientDashboard;
