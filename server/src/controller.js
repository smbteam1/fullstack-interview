const { prisma } = require("./client");

const createTask = async (req, res) => {
  try {
    let { title, description, status, category } = req.body;
    if (!title || !category) {
      return res.status(400).json({ message: "title and category required" });
    }
    if(!status)
    {
        status="pending"
    }
    const task = await prisma.task.create({
      data: { title, description, status, category },
    });

    return res.status(200).json({ message: "task created succusfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "internal server error" });
  }
};
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, category } = req.body;

    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }
    const numid = Number(id);
    const task = await prisma.task.findUnique({ where: { id: numid } });

    if (!task) {
      return res.status(400).json({ message: "task not found " });
    }

    await prisma.task.update({
      where: { id: numid },
      data: { title, description, status, category },
    });

    return res.status(200).json({ message: "task updated succusfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "internal server error" });
  }
};
const getTasks = async (req, res) => {
  try {
    const { category, status } = req.query;
    let where = {};
    if (category) {
      where.category = category;
    }
    if (status) {
      where.status = status;
    }

    const tasks = await prisma.task.findMany({ where });

    return res.status(200).json({ tasks });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "internal server error" });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
let numid=Number(id)
    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }

    const task = await prisma.task.findUnique({ where: { id: numid } });

    if (!task) {
      return res.status(400).json({ message: "task not found " });
    }

    await prisma.task.delete({
      where: { id: numid },
    });

    return res.status(200).json({ message: "task deleted succusfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "internal server error" });
  }
};
const getStats = async (req, res) => {
  try {
    const task = await prisma.task.find();

    if (!task.length) {
      return res.status(400).json({ message: "no tasks present" });
    }
    return res.status(200).json({ task });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "internal server error" });
  }
};

module.exports = { createTask, updateTask, deleteTask, getStats, getTasks };
