import { Link } from "react-router-dom";
import myApi from "../api/service";
const API_URL = import.meta.env.VITE_API_URL;
// import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function OneTrainingCard(props) {
  const { user } = useContext(UserContext);
  const [bookingMessage, setBookingMessage] = useState("Book Class");
  // const [disabledButton, setDisabledButton] = useState(false);

  const oneTraining = props.training;
  let isBooked = props.isBooked;

  const {
    name,
    description,
    trainingDate,
    duration,
    location,
    activityType,
    type,
    availableSpots,
    participants,
    booked,
  } = oneTraining;

  const handleDelete = () => {
    myApi
      .delete(`${API_URL}/api/trainings/${oneTraining._id}`)
      .then(() => props.getAllTrainings())
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    if (!isBooked) {
      setBookingMessage("Book");
    }
  }, [isBooked]);

  const handleBooking = () => {
    const requestbody = {
      training: oneTraining._id,
      client: user._id,
      coach: oneTraining.coach,
      status: "pending",
    };
    myApi
      .post(`${API_URL}/api/bookings`, requestbody)
      .then(() => {
        setBookingMessage("Booked!");
        isBooked = true;
        props.getClientBookings();
        props.getAllTrainings();
        // setDisabledButton(false);
      })
      .catch((e) => console.log(e));

    // // the training is oneTraining
    // // the coach is oneTraining.coach --> we just have the id
    // // the user is user._id
    // // now we need to .post(booking) et .patch(training) to add the user to the participants
    console.log("the student wants to book this", oneTraining);
    // =================================================================================================
  };

  return (
    <div className="training-card">
      <img
        src="src/assets/img/training-card-banner.jpg"
        alt="training card banner"
        className="training-banner"
      />
      <div className="card-info ">
        <h3>{name}</h3>
        <p className="booking-card-date">
          <FontAwesomeIcon icon={faCalendar} className="calendar-icon" />
          {new Intl.DateTimeFormat("en-EN", {
            dateStyle: "short",
            timeStyle: "short",
          }).format(new Date(trainingDate))}
        </p>
        <div className="div">
          <p>
            <div>
              <FontAwesomeIcon icon={faLocationDot} /> {location}
            </div>
            workout: {activityType}
            Spots left: {availableSpots}
          </p>
        </div>
      </div>
      <div className="card-actions">
        {user.role === "coach" ? (
          <div className="action-buttons coach-actions">
            <Link to={`/trainings/${oneTraining._id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={handleDelete}>Delete</button>
          </div>
        ) : (
          <div className=" action-buttons student-actions">
            <button>See Details</button>
            <button
              onClick={handleBooking}
              disabled={isBooked || oneTraining.booked}
            >
              {oneTraining.booked
                ? "Full"
                : isBooked
                ? "Requested"
                : bookingMessage}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OneTrainingCard;
