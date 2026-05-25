import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTask, getTask } from "../api/task.api";

const View = () => {
  const { id } = useParams();

  const [taskDetails, setTaskDetails] = useState({});
  const navigate = useNavigate();

  const getTaskDetails = async () => {
    const res = await getTask(id);
    console.log(res);
    
    setTaskDetails(res.task);
  };

  useEffect(() => {
    getTaskDetails();
  }, []);

  const handleDelete = async () => {
    try {
      const res = await deleteTask(id);

      if (res) {
        alert("Task Deleted Successfully");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ textAlign: "start", padding: "10px" }}>
      <h1>{taskDetails?.title}</h1>
      <h3>{taskDetails?.description}</h3>
      <h3>{taskDetails?.status}</h3>
      <h3>{taskDetails?.category}</h3>

      <button onClick={handleDelete}>delete</button>
    </div>
  );
};

export default View;