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
        setCoachBookings(res.data);

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
      })
      .catch((e) => console.log(e));
  }
  return (
    <div className="dashboard-action">
      <div className="action-tags">
        <Link to="/trainings">
          <button className="tag-button">Add Training</button>
        </Link>

        <CountBadge
          className="badge"
          number={activeBookings.length}
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
      <div className="booking-subsection list-container">
        <h3 className="list-container-title">Classes Booked:</h3>
        {coachBookings.map((booking) => {
          return (
            <OneBookingCard
              key={booking._id}
              oneTraining={booking.training}
              oneBooking={booking}
              getAllBookings={getBookedClasses}
            />
          );
        })}
      </div>
      <div className="booking-subsection list-container">
        <h3 className="list-container-title">Classes To Come:</h3>
        {activeBookings.length === 0 && (
          <div className="empty-subsection">
            <p>No Active bookings for now 😴</p>
          </div>
        )}
        {activeBookings.map((booking) => {
          return (
            <OneBookingCard
              key={booking._id}
              oneTraining={booking.training}
              oneBooking={booking}
              getAllBookings={getBookedClasses}
            />
          );
        })}
      </div>
      <div className="booking-subsection list-container" id="new-bookings">
        <h3 className="list-container-title">Classes To Confirm:</h3>
        {pendingBookings.length === 0 && (
          <div className="empty-subsection">
            <p>No Pending bookings ✅</p>
          </div>
        )}
        {pendingBookings.map((booking) => {
          return (
            <OneBookingCard
              key={booking._id}
              oneTraining={booking.training}
              oneBooking={booking}
              getAllBookings={getBookedClasses}
            />
          );
        })}
      </div>
      <div className="booking-subsection list-container">
        <h3 className="list-container-title">They Cancelled 😢</h3>
        {cancelRequestedBookings.length === 0 && (
          <div className="empty-subsection">
            <p>Actually no, you&#x2019;re good! </p>
          </div>
        )}
        {cancelRequestedBookings.map((booking) => {
          return (
            <OneBookingCard
              key={booking._id}
              oneTraining={booking.training}
              oneBooking={booking}
              getAllBookings={getBookedClasses}
            />
          );
        })}
      </div>
    </div>
  );
}
export default CoachTrainings;
