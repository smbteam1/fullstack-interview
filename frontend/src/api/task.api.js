import { api } from "./api";

export const getTasks = async () => {
  try {
    const res = await api.get();
    return res.data
  } catch (err) {
    console.log(err);
  }
};

export const getTask = async (id) => {
  try {
    const res = await api.get(`/${id}`);
    return res.data
  } catch (err) {
    console.log(err);
  }
};

export const createTask = async (body) => {
  try {
    const res = await api.post('', body);
    return res.data
  } catch (err) {
    console.log(err);
  }
};

export const deleteTask = async (id) => {
  try {
    const res = await api.delete(`/${id}`);
    return res.data
  } catch (err) {
    console.log(err);
  }
};
