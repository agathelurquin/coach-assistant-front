import TrainingForm from "../components/TrainingForm";
import { useParams } from "react-router-dom";

function OneTrainingPage() {
  const trainingToEdit = useParams().trainingId;
  console.log("trainingToEdit", trainingToEdit);
  return (
    <div className="page-content training-page">
      <h1>One Training Pageuh</h1>
      <TrainingForm oneTraining={trainingToEdit} submitAction="edit" />
    </div>
  );
}

export default OneTrainingPage;
