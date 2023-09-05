import myApi from "../api/service";
const API_URL = import.meta.env.VITE_API_URL;

import { UserContext } from "../context/AuthContext";
import { useContext, useState } from "react";

import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function OneBookingCard(props) {
  const { user } = useContext(UserContext);
  const oneTraining = props.oneTraining;
  const [updateBookingMessage, setUpdateBookingMessage] =
    useState("Cancel Booking");

  const oneBooking = props.oneBooking;

  const updateModel = (model) => {
    for (const key in model) {
      if (model[key] === "") {
        model[key] = undefined;
      }
    }
  };

  const resetTrainingAfterCancel = () => {
    if (oneBooking.status === "active") {
      console.log("adding a step to update the training");
      console.log("oneTraining.participants", oneTraining.participants);
      console.log(
        "oneBooking.client to find in the participants list",
        oneBooking.client
      );

      let updatedParticipantsList = [...oneTraining.participants];

      const idToRemove = updatedParticipantsList.indexOf(oneBooking.client);
      if (idToRemove > -1) {
        updatedParticipantsList.splice(idToRemove, 1);
      }
      const updatedTraining = {
        participants: [...updatedParticipantsList],
      };

      console.log("our new list of participants", updatedTraining);

      updateModel(updatedTraining);

      myApi
        .patch(`${API_URL}/api/trainings/${oneTraining._id}`, updatedTraining)
        .then((res) => console.log("we removed the participant", res.data))
        .catch((e) => console.log(e));
    }
  };

  const cancelActiveBooking = () => {
    console.log("one booking", oneBooking);
    let requestBody;
    console.log(oneBooking.status);
    if (oneBooking.status === "active") {
      requestBody = { ...oneBooking, status: "cancelledConfirmed" };
    } else if (oneBooking.status === "pending") {
      requestBody = { ...oneBooking, status: "cancelRequested" };
      console.log("passed it to requested");
    }
    // Here we should probably update the bookingMessage to cancelled and then setTime out to update the list
    myApi
      .patch(`${API_URL}/api/bookings/${oneBooking._id}`, requestBody)
      .then((res) => {
        setUpdateBookingMessage("Cancelled");
        setTimeout(() => {
          props.getClientBookings();
          props.getAllTrainings();
        }, 1000);
        console.log("booking is now cancelledConfirmed", res);
        console.log(
          "training that doesn't need to change because the booking was never accepted in the first place",
          oneTraining
        );
      })
      .catch((e) => console.log(e));
  };

  const handleCancel = () => {
    // here I should add a new confirmation level
    // if status pending: we let it as it is
    // if status is active

    // then we send a request to the coach to confirm cancel
    // and then the coach, when he hits handle cancel, generated the patch request
    resetTrainingAfterCancel();
    cancelActiveBooking();
    setUpdateBookingMessage("Cancelled");
  };

  const handleConfirmCancellation = () => {
    const requestBody = { ...oneBooking, status: "cancelledConfirmed" };
    myApi
      .patch(`${API_URL}/api/bookings/${oneBooking._id}`, requestBody)
      .then((res) => {
        console.log("booking updated", res);
        console.log("training updated", oneTraining);
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
      .then((res) =>
        console.log("we updated the booking status to active", res.data)
      )
      .catch((e) => console.log(e));
  };
  return (
    <div className="booking-card">
      <img src="src/assets/img/booking-image.jpg" alt="booking-image" />
      <div className="booking-card-info">
        <p className="booking-card-name">{oneBooking.training.name}</p>
        <p className="booking-card-date">
          <FontAwesomeIcon icon={faCalendar} className="calendar-icon" />
          {new Intl.DateTimeFormat("en-EN", {
            dateStyle: "short",
            timeStyle: "short",
          }).format(new Date(oneBooking.training.trainingDate))}
        </p>
        {/* <p>
          Available Spots:{" "}
          {oneBooking.training.availableSpots -
            oneBooking.training.participants.length}
        </p> */}
        <p>Status: {oneBooking.status}</p>
        {user.role === "student" ? (
          <button onClick={handleCancel}>Cancel Booking</button>
        ) : oneBooking.status === "pending" ? (
          <button onClick={handleConfirmBooking}>Accept Booking Request</button>
        ) : oneBooking.status === "cancelRequested" ? (
          <button onClick={handleConfirmCancellation}>
            Confirm booking cancellation
          </button>
        ) : (
          // so when it's active
          <button onClick={handleCancel}>{updateBookingMessage}</button>
        )}
      </div>
    </div>
  );
}

export default OneBookingCard;
