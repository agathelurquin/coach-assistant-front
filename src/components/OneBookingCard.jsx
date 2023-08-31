import myApi from "../api/service";
const API_URL = import.meta.env.VITE_API_URL;

import { UserContext } from "../context/AuthContext";
import { useContext } from "react";

function OneBookingCard(props) {
  const { user } = useContext(UserContext);
  const oneTraining = props.oneTraining;

  const oneBooking = props.oneBooking;

  const updateModel = (model) => {
    for (const key in model) {
      if (model[key] === "") {
        model[key] = undefined;
      }
    }
  };

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

    updateModel(updatedTraining);

    myApi
      .patch(`${API_URL}/api/trainings/${oneTraining._id}`, updatedTraining)
      .then((res) => console.log("we added a new participant", res.data))
      .catch((e) => console.log(e));

    const updatedBooking = {
      status: "active",
    };

    updateModel(updatedBooking);
    myApi
      .patch(`${API_URL}/api/bookings/${oneBooking._id}`, updatedBooking)
      .then((res) => console.log("we updated the booking status", res.data))
      .catch((e) => console.log(e));
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
