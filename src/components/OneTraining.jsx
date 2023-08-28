function OneTraining(props) {
  const oneTraining = props.training;
  const {
    name,
    description,
    trainingTime,
    trainingDate,
    duration,
    location,
    activityType,
    type,
    availableSpots,
    participants,
    booked,
  } = oneTraining;
  console.log("one traiing componenent:", oneTraining);
  return (
    <div className="training-card">
      <h3>{name}</h3>
      <p>{description}</p>
      <p>
        {`
        ${trainingTime} - ${trainingDate}
        duration: ${duration}
        location: ${location}
        workout: ${activityType}
        coaching type: ${type}
        available spots: ${availableSpots}
        participants: ${participants}
        status: ${booked ? "booked" : "available"}}
      `}
      </p>
    </div>
  );
}

export default OneTraining;
