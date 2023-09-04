import { useState, useEffect } from "react";
import myApi from "../api/service";
const API_URL = import.meta.env.VITE_API_URL;
import OneTrainingCard from "./OneTrainingCard";
import OneBookingCard from "./OneBookingCard";

function ClientDashboard(props) {
  const [clientBookings, setClientBookings] = useState([]);
  const [allTrainings, setAllTrainings] = useState([]);
  const [allTrainingsBooked, setAllTrainingsBooked] = useState([]);
  const avatar = props.avatar;
  // const [updateBookingMessage, setUpdateBookingMessage] =
  //   useState("Cancel Booking");

  function getAllTrainings() {
    myApi
      .get(`${API_URL}/api/trainings`)
      .then((res) => {
        const response = [...res.data];
        response.sort(function (a, b) {
          let keyA = new Date(a.trainingDate),
            keyB = new Date(b.trainingDate);
          // Compare the 2 dates
          if (keyA < keyB) return 1;
          if (keyA > keyB) return -1;
          return 0;
        });
        setAllTrainings([...response]);
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
        <h3 className="list-container-title">FIND A WORKOUT </h3>
        <div className="list-card all-trainings-card">
          {allTrainings.map((training) => {
            return (
              <div className="training-card" key={training._id}>
                {allTrainingsBooked.includes(training._id) ? (
                  <OneTrainingCard
                    avatar={avatar}
                    training={training}
                    isBooked={true}
                    getClientBookings={() => {}}
                  />
                ) : (
                  <OneTrainingCard
                    avatar={avatar}
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
