import myApi from "../api/service";
const API_URL = import.meta.env.VITE_API_URL;

function OneBookingCard(props) {
  const oneBooking = props.oneBooking;

  const handleCancel = () => {
    const requestBody = { ...oneBooking, status: "cancelled" };
    console.log("after the setbooking:", oneBooking);
    myApi
      .patch(`${API_URL}/api/bookings/${oneBooking._id}`, requestBody)
      .then((res) => {
        console.log("booking updated", res);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="booking-card">
      <div className="booking-card-info">
        <p>{oneBooking.training.name}</p>
        <p>{oneBooking.training.trainingDate}</p>
        <p>Status: {oneBooking.status}</p>
        <button onClick={handleCancel}>Cancel Booking</button>
      </div>
    </div>
  );
}

export default OneBookingCard;
