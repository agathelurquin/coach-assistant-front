import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/AuthContext";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const defaultTrainingValues = {
  name: "",
  description: "",
  trainingDate: "",
  trainingTime: "",
  duration: "",
  location: "",
  price: "",
  activityType: "",
  coach: "",
  type: "",
  availableSpots: "",
  participants: [],
  booked: false,
};

function NewTrainingPage() {
  const { user } = useContext(UserContext);
  console.log("in the settraining function", user._id);
  const [training, setTraining] = useState({ ...defaultTrainingValues });
  const [submitting, setSubmitting] = useState(false);
  const trainingTypeOptions = ["private", "group", "pro"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { ...training, coach: user._id };
    setSubmitting(true);

    axios
      .post(`${API_URL}/api/trainings`, requestBody)
      .then((res) => {
        console.log(res);
        setTraining({ ...defaultTrainingValues, coach: user._id });
        setSubmitting(false);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    setTraining({ ...defaultTrainingValues, coach: user._id });
  }, [user._id]);

  const handleChange = (e) => {
    console.log("the value", e.target.value, e.target);
    const inputValue = e.target.value;
    setTraining((prevTraining) => ({
      ...prevTraining,
      [e.target.name]: inputValue,
    }));
  };

  useEffect(() => {
    setTraining({ ...defaultTrainingValues });
  }, [user._id]);

  return (
    <div className="training-form">
      <form onSubmit={handleSubmit}>
        <h3>Add a new training slot</h3>
        <div>
          <label htmlFor="name">Training Name: </label>
          <input
            type="text"
            name="name"
            value={training.name}
            onChange={handleChange}
            // disabled={submitting}
          />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            name="description"
            value={training.description}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>
        <div>
          <label htmlFor="trainingTime">Time of the training: </label>
          <input
            type="time"
            name="trainingTime"
            value={training.trainingTime}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>
        <div>
          <label htmlFor="trainingDate">Date of the training: </label>
          <input
            type="date"
            name="trainingDate"
            value={training.trainingDate}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>
        <div>
          <label htmlFor="duration">Duration of the training: </label>
          <input
            type="time"
            name="duration"
            value={training.duration}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>
        <div>
          <label htmlFor="location">Location: </label>
          <input
            type="text"
            name="location"
            value={training.location}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>
        <div>
          <label htmlFor="price">Price </label>
          <input
            type="text"
            name="price"
            value={training.price}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>
        {/* CONFIG LES ACTIVITES */}
        <div>
          <label htmlFor="activityType">activity:</label>
          <input
            type="text"
            name="activityType"
            value={training.activityType}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>
        <div>
          <label htmlFor="type">Training type:</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            value={training.type}
          >
            {trainingTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="availableSpots">Available Spots:</label>
          <input
            type="number"
            name="availableSpots"
            value={training.availableSpots}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>
        <button>Add Training</button>
      </form>
    </div>
  );
}

export default NewTrainingPage;