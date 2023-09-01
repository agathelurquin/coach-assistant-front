import { useState, useEffect } from "react";
import myApi from "../api/service";
const API_URL = import.meta.env.VITE_API_URL;
import OneTrainingCard from "./OneTrainingCard";
import OneBookingCard from "./OneBookingCard";

function ClientDashboard() {
  const [clientBookings, setClientBookings] = useState([]);
  const [allTrainings, setAllTrainings] = useState([]);
  const [allTrainingsBooked, setAllTrainingsBooked] = useState([]);
  // const [updateBookingMessage, setUpdateBookingMessage] =
  //   useState("Cancel Booking");

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

  useEffect(() => {
    setAllTrainingsBooked(
      clientBookings.map((booking) => booking.training._id)
    );
  }, [clientBookings]);

  useEffect(() => {
    getAllTrainings();
    getClientBookings();
  }, []);
  console.log(clientBookings);
  return (
    <div className="client-dashboard">
      <div className="list-container">
        <h3 className="list-container-title">YOUR CLASSES </h3>
        <div className="list-card">
          {clientBookings.map((booking) => {
            return (
              <OneBookingCard
                oneBooking={booking}
                key={booking._id}
                getClientBookings={getClientBookings}
                getAllTrainings={getAllTrainings}
              />
            );
          })}
        </div>
      </div>

      <div className="list-container">
        <h3 className="list-container-title">All Classes </h3>
        <div className="list-card all-trainings-card">
          {allTrainings.map((training) => {
            if (allTrainingsBooked.includes(training._id)) {
              console.log(
                allTrainingsBooked.includes(training._id),
                training._id,
                training.name
              );
            }
            return (
              <div className="training-card" key={training._id}>
                {allTrainingsBooked.includes(training._id) ? (
                  <OneTrainingCard
                    training={training}
                    isBooked={true}
                    getClientBookings={() => {}}
                  />
                ) : (
                  <OneTrainingCard
                    training={training}
                    isBooked={false}
                    getClientBookings={getClientBookings}
                    getAllTrainings={getAllTrainings}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ClientDashboard;
