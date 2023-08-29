import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/AuthContext";
import myApi from "../api/service";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
const API_URL = import.meta.env.VITE_API_URL;

// default values for the create route
const defaultTrainingValues = {
  name: "",
  description: "",
  trainingDate: dayjs(new Date()),
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

function TrainingForm(props) {
  const [training, setTraining] = useState({ ...defaultTrainingValues });
  const [submitting, setSubmitting] = useState(false);
  const trainingTypeOptions = ["private", "group", "pro"];
  // additional var for the edit route
  const idToEdit = props.oneTraining;
  const submitAction = props.submitAction;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // submit for the create route
  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { ...training, coach: user._id };
    setSubmitting(true);
    // send the training object then resets the form values
    myApi
      .post(`${API_URL}/api/trainings`, requestBody)
      .then(() => {
        setTraining({ ...defaultTrainingValues, coach: user._id });
        setSubmitting(false);
        navigate("/dashboard");
      })
      .catch((e) => console.log(e));
  };

  // fetch the training we want to edit
  // assign its values to our training object
  // format the trainingData field because of MUI component value format constraints
  function setTrainingToEdit() {
    myApi
      .get(`${API_URL}/api/trainings/${idToEdit}`)
      .then((res) => {
        setTraining({
          ...res.data,
          trainingDate: dayjs(res.data.trainingDate),
        });
      })
      .catch((e) => console.log(e));
  }

  // submit for the edit route
  const handleEdit = (e) => {
    e.preventDefault();
    const requestBody = { ...training, coach: user._id };
    setSubmitting(true);

    // prevent non-modified values to be considered as "to delete" from the db
    // by setting them as undefined if not modified, so that the db won't process them
    for (const key in requestBody) {
      if (requestBody[key] === "") {
        requestBody[key] = undefined;
      }
    }

    myApi
      .patch(`${API_URL}/api/trainings/${idToEdit}`, requestBody)
      .then(() => {
        setTraining({ ...training, coach: user._id });
        setSubmitting(false);
        navigate("/dashboard");
      })
      .catch((e) => console.log(e));
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setTraining((prevTraining) => ({
      ...prevTraining,
      [e.target.name]: inputValue,
    }));
  };

  // Only one useEffect executed when we load the page to define if our training object is empty or has previously set values
  useEffect(() => {
    if (submitAction === "edit") {
      setTrainingToEdit();
    }
  }, []);

  return (
    <div className="training-form">
      <h3>
        {submitAction === "edit"
          ? "Update your training info"
          : "Add a new training slot"}
      </h3>
      <form onSubmit={submitAction === "edit" ? handleEdit : handleSubmit}>
        <div>
          <label htmlFor="name">Training Name: </label>
          <input
            type="text"
            name="name"
            placeholder=""
            value={training.name}
            onChange={handleChange}
            disabled={submitting}
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
          <label htmlFor="trainingDate">Date of the training: </label>
          <DateTimePicker
            name="trainingDate"
            value={training.trainingDate}
            // inputFormat=""
            onChange={(value) =>
              setTraining((training) => ({ ...training, trainingDate: value }))
            }
            disabled={submitting}
            label="Workout Date and Time"
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

        <button>
          {" "}
          {submitAction === "edit" ? "Edit Training" : "Add Training"}
        </button>
      </form>
    </div>
  );
}

export default TrainingForm;
