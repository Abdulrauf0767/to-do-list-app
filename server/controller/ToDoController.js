const TodoModel = require("../models/TodoModel");

let addTask = async (req, res) => {
  try {
    let { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }
    let todo = new TodoModel({ title, description });
    await todo.save();
    res.status(201).json(todo); // Frontend expects full object
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

let getTasks = async (req, res) => {
  try {
    let limit = parseInt(req.query.limit) || 10;
    let page = parseInt(req.query.page) || 1;
    let skip = (page - 1) * limit;

    let tasks = await TodoModel.find().skip(skip).limit(limit);
    let totalCount = await TodoModel.countDocuments();

    res.status(200).json({
      todos: tasks,
      totalPages: Math.ceil(totalCount / limit),
      totalTasks: totalCount
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

let deleteTask = async (req, res) => {
  try {
    let taskId = req.params.id;
    await TodoModel.findByIdAndDelete(taskId);
    res.status(200).json({ message: "Task deleted successfully", id: taskId });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

let editTask = async (req, res) => {
  try {
    let taskId = req.params.id;
    let { title, description } = req.body;
    let updatedTask = await TodoModel.findByIdAndUpdate(taskId, { title, description }, { new: true });
    res.status(200).json(updatedTask); // Return updated task to update state
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addTask, getTasks, deleteTask, editTask };
