import { Link } from "react-router-dom";
import myApi from "../api/service";
const API_URL = import.meta.env.VITE_API_URL;

function OneTrainingCard(props) {
  const oneTraining = props.training;
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
        <Link to={`/trainings/${oneTraining._id}`}>
          <button>Edit</button>
        </Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default OneTrainingCard;
