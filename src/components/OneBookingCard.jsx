import myApi from "../api/service";
const API_URL = import.meta.env.VITE_API_URL;

import { UserContext } from "../context/AuthContext";
import { useContext } from "react";

function OneBookingCard(props) {
  const { user } = useContext(UserContext);
  const oneTraining = props.oneTraining;

  const oneBooking = props.oneBooking;

  const handleCancel = () => {
    const requestBody = { ...oneBooking, status: "cancelled" };
    console.log("after the setbooking:", oneBooking);
    myApi
      .patch(`${API_URL}/api/bookings/${oneBooking._id}`, requestBody)
      .then((res) => {
        console.log("booking updated", res);
      })
      .catch((e) => console.log(e));
  };

  const handleConfirmBooking = () => {
    console.log("the training we are receiving as a props: ", props);
    const updatedTraining = {
      participants: [...oneTraining.participants, oneBooking.client],
    };
    for (const key in updatedTraining) {
      if (updatedTraining[key] === "") {
        updatedTraining[key] = undefined;
      }
    }
    myApi
      .patch(`${API_URL}/api/trainings/${oneTraining._id}`, updatedTraining)
      .then((res) => console.log("we added a new participant", res.data))
      .catch((e) => console.log(e));

    // the training is oneTraining
    // the coach is oneTraining.coach --> we just have the id
    // the user is user._id
    // now we need to .post(booking) et .patch(training) to add the user to the participants
  };
  return (
    <div className="booking-card">
      <div className="booking-card-info">
        <p>{oneBooking.training.name}</p>
        <p>{oneBooking.training.trainingDate}</p>
        <p>
          Available Spots:{" "}
          {oneBooking.training.availableSpots -
            oneBooking.training.participants.length}
        </p>
        <p>Status: {oneBooking.status}</p>
        {user.role === "student" ? (
          <button onClick={handleCancel}>Cancel Booking</button>
        ) : (
          <button onClick={handleConfirmBooking}>Accept Booking Request</button>
        )}
      </div>
    </div>
  );
}

export default OneBookingCard;
