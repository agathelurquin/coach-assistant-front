import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import myApi from "../api/service";
const API_URL = import.meta.env.VITE_API_URL;
import OneTrainingCard from "./OneTrainingCard";
import OneBookingCard from "./OneBookingCard";

function CoachTrainings(props) {
  const coachId = props.coachId;
  console.log("our coach Id is: ", coachId);
  const [coachTrainings, setCoachTrainings] = useState([]);
  const [coachBookings, setCoachBookings] = useState([]);

  useEffect(() => {
    getAllTrainings();
    getBookedClasses();
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

  function getBookedClasses() {
    myApi
      .get(`${API_URL}/api/bookings/coach`)
      .then((res) => {
        setCoachBookings(res.data);
        console.log("response", res.data, "stored", coachBookings);
      })
      .catch((e) => console.log(e));
    //get /bookings/coaches/trainings/coaches/:coachId
    // find
  }

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
      <h3>Classes Booked:</h3>
      {coachBookings.map((booking) => {
        return (
          <OneBookingCard
            key={booking._id}
            oneTraining={booking.training}
            oneBooking={booking}
            getAllBookings={getBookedClasses}
          />
        );
      })}
    </div>
  );
}
export default CoachTrainings;
