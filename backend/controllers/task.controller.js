const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { title, description, category, status } = req.body;

    const task = new Task({ title, description, category, status });

    await task.save();

    res.status(201).send({ message: "Task created Succesfully", task });
  } catch (err) {
    console.log(err);

    res.status(400).send({ message: err });
  }
};

const getTasks = async (req, res) => {
  try {
    const {page=1,limit=10, search}= req.query
    const offset = (page - 1) * limit;
    const tasks = await Task.find({}).skip(offset)
    .limit(limit);

    res.status(200).send({ message: "Tasks retrieved Succesfully", tasks });
  } catch (err) {
    console.log(err);

    res.status(400).send({ message: err });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (task) {
      res.status(200).send({ message: "Task retrieved Succesfully", task });
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  } catch (err) {
    console.log(err);

    res.status(400).send({ message: err });
  }
};

const editTask = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const result = await Task.updateOne(
      { _id: id },
      { $set: updates },
    );
    if (result.matchedCount === 1) {
      res.status(200).send({ message: "Task updated", result });
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  } catch (err) {
    
    res.status(500).send("Error updating document");
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Task.findByIdAndDelete(id);

    if (result) {
      res.status(200).send({message:'Task deleted'});
    } else {
      res.status(404).send('Task not found');
    }
  } catch (err) {

    res.status(400).send({ message: err });
  }
};

const getTaskStats = async (_, res) => {
  try {
    const result = await Task.aggregate([
    {
        $group: {
        _id: "$status",      
        count: { $sum: 1 }  
        }
    }
    ]);     

    res.status(200).send({ message: "Tasks Stats retrieved Succesfully", result });
  } catch (err) {

    res.status(400).send({ message: err });
  }
};

module.exports = { createTask, getTasks, getTaskById, editTask, deleteTask, getTaskStats };
