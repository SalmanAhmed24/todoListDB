const mongoose = require("mongoose");
const taskModel = require("../Models/taskModel");
const userModel = require("../Models/userModel");
const addNewTask = async (req, res, next) => {
  const { title, date, startTime, endTime, category, description, userId } =
    req.body;
  const newTask = new taskModel({
    title,
    date,
    startTime,
    endTime,
    category,
    description,
    status: false,
    userId,
  });
  let userEx;
  try {
    userEx = await userModel.findById(userId);
  } catch (error) {
    res.json({
      message: "Something went wrong while adding task please try again",
      error: true,
    });
    return next(error);
  }
  if (!userEx) {
    res.json({
      message: "Something went wrong while adding task please try again",
      error: true,
    });
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newTask.save({ session: sess });
    userEx.tasks.push(newTask);
    await userEx.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    res.json({
      message: "Something went wrong while adding task please try again",
      error: true,
    });
    return next(error);
  }
  res.json({ message: "Task added succesfully", error: false });
};
const getTasks = async (req, res, next) => {
  const { userId } = req.body;
  let allTask;
  try {
    allTask = await taskModel.find({ userId: userId });
  } catch (error) {
    res.json({
      message: "Something went wrong while looking for tasks",
      error: true,
    });
    return next(error);
  }
  res.json({ tasks: allTask.map((i) => i.toObject({ getters: true })) });
};
const getTaskById = async (req, res, next) => {
  const { taskId } = req.params;
  let specificTask;
  try {
    specificTask = await taskModel.findById(taskId);
  } catch (error) {
    res.json({
      message: "Something went wrong while looking for tasks",
      error: true,
    });
    return next(error);
  }
  res.json({ tasks: specificTask.toObject({ getters: true }) });
};
const deleteTasks = async (req, res, next) => {
  const { taskId } = req.params;
  let taskToBeEdit;
  try {
    await taskModel.findByIdAndRemove(taskId);
  } catch (error) {
    res.json({ message: "Could not found the specific task", error: true });
    return next(error);
  }
  //   try {
  //     await taskToBeEdit.remove();
  //   } catch (error) {
  //     res.json({
  //       message: "Unable to delete the task please try again",
  //       error: true,
  //     });
  //     return next(error);
  //   }
  res.status(201).json({ message: "Deleted successfully", error: true });
};
const editTasks = async (req, res, next) => {
  const { title, date, startTime, endTime, category, description } = req.body;
  const { taskId } = req.params;
  let taskToBeEdit;
  try {
    taskToBeEdit = await taskModel.findById(taskId);
  } catch (error) {
    res.json({ message: "Could not found the specific task", error: true });
    return next(error);
  }
  taskToBeEdit.title = title;
  taskToBeEdit.date = date;
  taskToBeEdit.startTime = startTime;
  taskToBeEdit.endTime = endTime;
  taskToBeEdit.description = description;
  try {
    await taskToBeEdit.save();
  } catch (error) {
    res.json({
      message: "Unable to edit the task please try again",
      error: true,
    });
    return next(error);
  }
  res.status(201).json({ message: "Edited successfully", error: true });
};
const doneTask = async (req, res, next) => {
  const { taskId } = req.params;
  let taskToBeEdit;
  try {
    taskToBeEdit = await taskModel.findById(taskId);
  } catch (error) {
    res.json({ message: "Could not found the specific task", error: true });
    return next(error);
  }
  taskToBeEdit.status = true;
  try {
    await taskToBeEdit.save();
  } catch (error) {
    res.json({
      message: "Unable to edit the task please try again",
      error: true,
    });
    return next(error);
  }
  res.status(201).json({ message: "Edited successfully", error: true });
};
exports.addNewTask = addNewTask;
exports.getTasks = getTasks;
exports.deleteTasks = deleteTasks;
exports.editTasks = editTasks;
exports.doneTask = doneTask;
exports.getTaskById = getTaskById;
