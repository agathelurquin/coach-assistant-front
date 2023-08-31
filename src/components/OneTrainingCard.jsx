import { Link } from "react-router-dom";
import myApi from "../api/service";
const API_URL = import.meta.env.VITE_API_URL;
// import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/AuthContext";
import { useContext, useState } from "react";

function OneTrainingCard(props) {
  const { user } = useContext(UserContext);
  const [bookingMessage, setBookingMessage] = useState("Book Class");
  const [disabledButton, setDisabledButton] = useState(false);

  const oneTraining = props.training;
  const isBooked = props.isBooked;

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

  const handleBooking = () => {
    const requestbody = {
      training: oneTraining._id,
      client: user._id,
      coach: oneTraining.coach,
    };
    myApi
      .post(`${API_URL}/api/bookings`, requestbody)
      .then(() => {
        setBookingMessage("Booked!");
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
      <div className="card-info">
        <h3>{name}</h3>
        <p>{description}</p>
        <p>
          {`
        ${new Intl.DateTimeFormat("en-EN", {
          dateStyle: "short",
          timeStyle: "short",
        }).format(new Date(trainingDate))}
        duration: ${duration}
        location: ${location}
        workout: ${activityType}
        coaching type: ${type}
        available spots: ${availableSpots}
        participants: ${participants}
        status: ${booked ? "booked" : "available"}
      `}
        </p>
      </div>
      <div className="card-actions">
        {user.role === "coach" ? (
          <div className="coach-actions">
            <Link to={`/trainings/${oneTraining._id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={handleDelete}>Delete</button>
          </div>
        ) : (
          <div className="student-actions">
            <button>See Class Details</button>
            <button
              onClick={handleBooking}
              disabled={isBooked || oneTraining.booked}
            >
              {oneTraining.booked
                ? "Full"
                : isBooked
                ? "Already Booked"
                : bookingMessage}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OneTrainingCard;
