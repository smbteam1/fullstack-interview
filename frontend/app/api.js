import axios from "axios";

export const createTask = async (title, description, category, status) => {
  try {
    const res = await axios.post("http://localhost:4000/api/tasks", {
      title,
      description,
      status,
      category,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getTasks = async ( category, status) => {
  try {
    const res = await axios.get("http://localhost:4000/api/tasks",{params:{
      status,
      category
    }});
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateTask = async (id, title, description, category, status) => {
  try {
    console.log('hited');
    
    
    const res = await axios.put(`http://localhost:4000/api/tasks/${id}`, {
      title,
      description,
      status,
      category,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteTask = async (id) => {
  try {
      
    

    const res = await axios.delete(`http://localhost:4000/api/tasks/${id}`);
    
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getStats = async () => {
  try {
    const res = await axios.get(`http://localhost:4000/api/tasks/stats}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
