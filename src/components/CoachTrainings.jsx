import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import myApi from "../api/service";
const API_URL = import.meta.env.VITE_API_URL;
import OneTrainingCard from "./OneTrainingCard";
import OneBookingCard from "./OneBookingCard";
import CountBadge from "./CountBadge";

function CoachTrainings(props) {
  const coachId = props.coachId;
  console.log("our coach Id is: ", coachId);
  const [coachTrainings, setCoachTrainings] = useState([]);
  const [coachBookings, setCoachBookings] = useState([]);

  const [pendingBookings, setPendingBookings] = useState([]);
  const [activeBookings, setActiveBookings] = useState([]);
  const [cancelRequestedBookings, setCancelRequestedBookings] = useState([]);
  const [flashMessage, setFlashMessage] = useState("");

  const pendings = [];
  const actives = [];
  const cancelRequest = [];

  // const [allTrainingsBooked, setAllTrainingsBooked] = useState([]);
  // useEffect(() => {
  //   setAllTrainingsBooked(coachBookings.map((booking) => booking.training._id));
  // }, [coachBookings]);

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
        let activeBookings = [];
        res.data.forEach((booking) => {
          if (booking.status === "active") {
            activeBookings.push(booking);
          }
        });
        setCoachBookings(activeBookings);

        console.log("response", res.data, "stored", coachBookings);
        console.log("are coach trainings updated", coachBookings);
        res.data.forEach((booking) => {
          console.log("working");
          if (booking.status === "active") {
            console.log(
              "adding an active booking",
              booking.training.name,
              booking._id
            );
            actives.push(booking);
          } else if (booking.status === "pending") {
            pendings.push(booking);
            console.log(
              "adding a pending booking",
              booking.training.name,
              booking._id
            );
          } else if (booking.status === "cancelRequested") {
            cancelRequest.push(booking);
            console.log(
              "adding a cancelRequested booking",
              booking.training.name,
              booking._id
            );
          }
        });
        setPendingBookings([...pendings]);
        setActiveBookings([...actives]);
        setCancelRequestedBookings([...cancelRequest]);
        console.log("requested: ", cancelRequestedBookings);
      })
      .catch((e) => console.log(e));
  }
  return (
    <div className="dashboard-action">
      {flashMessage && <div className="flash-message">{flashMessage}</div>}

      <div className="action-tags">
        <Link to="/trainings">
          <button className="tag-button">Add Training</button>
        </Link>

        <CountBadge
          className="badge"
          number={pendingBookings.length}
          href="#new-bookings"
          message="New Bookings"
        />
        <CountBadge
          className="badge"
          number={cancelRequestedBookings.length}
          href="#cancellations"
          message="Cancellations"
        />
      </div>
      <div className="booking-subsection list-container">
        <h3 className="list-container-title">Classes Booked:</h3>
        <div className="list-card">
          {coachBookings.map((booking) => {
            return (
              <OneBookingCard
                key={booking._id}
                oneTraining={booking.training}
                oneBooking={booking}
                getAllBookings={getBookedClasses}
                flashMessage={flashMessage}
                setFlashMessage={setFlashMessage}
              />
            );
          })}
        </div>
      </div>
      <div className="booking-subsection list-container">
        <h3 className="list-container-title">Classes To Come:</h3>
        {activeBookings.length === 0 && (
          <div className="empty-subsection">
            <p>No Active bookings for now 😴</p>
          </div>
        )}
        <div className="list-card">
          {coachTrainings.slice(0, 1).map((training) => {
            return (
              <OneTrainingCard
                key={training._id}
                training={training}
                getAllTrainings={getAllTrainings}
              />
            );
          })}
        </div>
      </div>
      <div className="booking-subsection list-container" id="new-bookings">
        <h3 className="list-container-title" id="cancellations">
          Classes To Confirm:
        </h3>
        {pendingBookings.length === 0 && (
          <div className="empty-subsection">
            <p>No Pending bookings ✅</p>
          </div>
        )}
        <div className="list-card">
          {pendingBookings.map((booking) => {
            return (
              <OneBookingCard
                key={booking._id}
                oneTraining={booking.training}
                oneBooking={booking}
                getAllBookings={getBookedClasses}
                className="coach-cards"
                flashMessage={flashMessage}
                setFlashMessage={setFlashMessage}
              />
            );
          })}
        </div>
      </div>
      <div className="booking-subsection list-container">
        <h3 className="list-container-title">They Cancelled 😢</h3>
        {cancelRequestedBookings.length === 0 && (
          <div className="empty-subsection">
            <p>Actually no, you&#x2019;re good! </p>
          </div>
        )}
        <div className="list-card">
          {cancelRequestedBookings.map((booking) => {
            return (
              <OneBookingCard
                key={booking._id}
                oneTraining={booking.training}
                oneBooking={booking}
                getAllBookings={getBookedClasses}
                flashMessage={flashMessage}
                setFlashMessage={setFlashMessage}
              />
            );
          })}
        </div>
        <div className="list-container">
          <h3 className="list-container-title">YOUR TRAININGS</h3>
          <div className="list-card">
            {coachTrainings.map((training) => {
              return (
                <OneTrainingCard
                  key={training._id}
                  training={training}
                  getAllTrainings={getAllTrainings}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default CoachTrainings;
