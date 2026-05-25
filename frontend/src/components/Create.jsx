import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createTask, getTask } from "../api/task.api";

const Create = () => {
  const [taskDetails, setTaskDetails] = useState({});

  const submitForm = async () => {
    try {
      if (!taskDetails.title || !taskDetails.category) {
        alert("title and category is required");
        return;
      }
      const res = await createTask(taskDetails);
      if (res) {
        alert("task Created Succesfully");
        setTaskDetails({});
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        textAlign: "start",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1>Create a Task</h1>
      <input
        value={taskDetails.title}
        type="text"
        placeholder="Title"
        onChange={(e) => {
          setTaskDetails({
            ...taskDetails,
            title: e.target.value,
          });
        }}
      />
      <textarea
        value={taskDetails.description}
        rows={5}
        type="text"
        placeholder="Description"
        onChange={(e) => {
          setTaskDetails({
            ...taskDetails,
            description: e.target.value,
          });
        }}
      />

      <select
        value={taskDetails.status}
        placeholder="Status"
        name="status"
        onChange={(e) => {
          setTaskDetails({
            ...taskDetails,
            status: e.target.value,
          });
        }}
      >
        <option value="">Select a status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        value={taskDetails.category}
        placeholder="Category"
        name="category"
        onChange={(e) => {
          setTaskDetails({
            ...taskDetails,
            category: e.target.value,
          });
        }}
      >
        <option value="">Select a category</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="shopping">Shopping</option>
        <option value="other">Other</option>
      </select>
      <button onClick={submitForm}>Submit</button>
      <Link to={'/'}>Home</Link>    
    </div>
  );
};
export default Create;
