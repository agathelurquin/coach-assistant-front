import { useState, useEffect } from "react";
import myApi from "../api/service";
const API_URL = import.meta.env.VITE_API_URL;
import OneTrainingCard from "../components/OneTrainingCard";
import { Carousel } from "antd";
import { ConsoleSqlOutlined } from "@ant-design/icons";

function ClientDashboard() {
  const [clientBookings, setClientBookings] = useState([]);
  const [allTrainings, setAllTrainings] = useState([]);
  const [allTrainingsBooked, setAllTrainingsBooked] = useState([]);
  const [trainingCatalog, setTrainingCatalog] = useState([]);
  const [pastTrainings, setPastTrainings] = useState([]);

  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  function getAllTrainings() {
    myApi
      .get(`${API_URL}/api/trainings`)
      .then((res) => {
        console.log(
          "all trainings",
          res.data,
          new Date(res.data[0].trainingDate) < new Date(),
          new Date(res.data[0].trainingDate)
        );
        setAllTrainings([...res.data]);

        for (let training of res.data) {
          if (new Date(training.trainingDate) <= new Date()) {
            console.log("before");
          } else {
            setTrainingCatalog([...trainingCatalog, training]);
          }
        }
        setTrainingCatalog([...res.data]);
      })
      .catch((e) => console.log(e));
  }
  // const [updateBookingMessage, setUpdateBookingMessage] =
  //   useState("Cancel Booking");

  function getClientBookings() {
    myApi
      .get(`${API_URL}/api/bookings/client`)
      .then((res) => setClientBookings(res.data))
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    setAllTrainingsBooked(
      clientBookings.map((booking) => booking.training._id)
    );
  }, [clientBookings]);

  useEffect(() => {
    getAllTrainings();
    getClientBookings();
  }, []);
  console.log(clientBookings);
  return (
    <div className="page-content">
      <div className="carousel">
        <Carousel autoplay>
          <div>
            <h3 style={contentStyle}>{pastTrainings}</h3>
          </div>
          <div>
            <h3 style={contentStyle}>{pastTrainings[1]}</h3>
          </div>
          <div>
            <h3 style={contentStyle}>{pastTrainings[2]}</h3>
          </div>
          <div>
            <h3 style={contentStyle}>{pastTrainings[3]}</h3>
          </div>
        </Carousel>
      </div>
      <div className="list-container">
        <h3 className="list-container-title">FIND A WORKOUT </h3>
        <div className="list-card all-trainings-card">
          {trainingCatalog.map((training) => {
            return (
              <div className="training-card" key={training._id}>
                {allTrainingsBooked.includes(training._id) ? (
                  <OneTrainingCard
                    training={training}
                    isBooked={true}
                    getClientBookings={() => {}}
                  />
                ) : (
                  <OneTrainingCard
                    training={training}
                    isBooked={false}
                    getClientBookings={getClientBookings}
                    getAllTrainings={getAllTrainings}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="list-container">
        <h3 className="list-container-title">YOU JUST MISSED THEM !</h3>
        <div className="list-card all-trainings-card">
          {allTrainings.slice(0, 15).map((training) => {
            if (new Date(training.trainingDate) <= new Date()) {
              return (
                <div className="training-card" key={training._id}>
                  <OneTrainingCard
                    training={training}
                    isBooked={true}
                    getClientBookings={() => {}}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default ClientDashboard;
