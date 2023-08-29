import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/AuthContext";
import myApi from "../api/service";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
const API_URL = import.meta.env.VITE_API_URL;
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
  const idToEdit = props.oneTraining;
  // let trainingToEdit = {};
  const submitAction = props.submitAction;
  const { user } = useContext(UserContext);
  console.log("in the settraining function", user._id);
  const [training, setTraining] = useState({ ...defaultTrainingValues });
  const [submitting, setSubmitting] = useState(false);
  const trainingTypeOptions = ["private", "group", "pro"];

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { ...training, coach: user._id };
    setSubmitting(true);

    myApi
      .post(`${API_URL}/api/trainings`, requestBody)
      .then((res) => {
        console.log(res);
        setTraining({ ...defaultTrainingValues, coach: user._id });
        setSubmitting(false);
      })
      .catch((e) => console.log(e));
  };

  function setTrainingToEdit() {
    myApi
      .get(`${API_URL}/api/trainings/${idToEdit}`)
      .then((res) => {
        // trainingToEdit = res.data;
        // const { name, description, trainingDate } = trainingToEdit;
        // console.log("label to edit", name);

        setTraining({
          ...res.data,
          trainingDate: dayjs(res.data.trainingDate),
        });
      })
      .catch((e) => console.log(e));
  }

  // if (submitAction === "edit") {
  //   setTrainingToEdit();
  //   // defaultTrainingValues.name = trainingToEdit.name
  //   // defaultTrainingValues.description = trainingToEdit.description;
  //   // console.log("name", trainingToEdit.name);
  //   // defaultTrainingValues.trainingDate = ,
  //   // defaultTrainingValues.duration = ,
  //   // defaultTrainingValues.location = ,
  //   // defaultTrainingValues.price,
  //   // defaultTrainingValues.activityType: "",
  //   // defaultTrainingValues.coach: "",
  //   // defaultTrainingValues.type: "",
  //   // defaultTrainingValues.availableSpots: "",
  //   // defaultTrainingValues.participants: [],
  //   // defaultTrainingValues.booked: false,
  // }

  const handleEdit = (e) => {
    e.preventDefault();
    const requestBody = { ...training, coach: user._id };
    setSubmitting(true);
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
      })
      .catch((e) => console.log(e));
  };

  // useEffect(() => {
  //   setTraining({ ...defaultTrainingValues, coach: user._id });
  // }, [user._id]);

  const handleChange = (e) => {
    console.log("the value", e.target);

    const inputValue = e.target.value;
    setTraining((prevTraining) => ({
      ...prevTraining,
      [e.target.name]: inputValue,
    }));
  };

  useEffect(() => {
    if (submitAction === "edit") {
      setTrainingToEdit();
    }
  }, []);
  // useEffect(() => {
  //   setTraining({ ...defaultTrainingValues });
  // }, [user._id]);

  console.log("HERE =============> ", training.trainingDate);
  return (
    <div className="training-form">
      <h3>
        {submitAction === "edit"
          ? "Update your training info"
          : "Add a new training slot"}
      </h3>
      <form onSubmit={submitAction === "create" ? handleSubmit : handleEdit}>
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
            inputFormat=""
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
