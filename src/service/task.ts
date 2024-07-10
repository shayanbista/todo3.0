import { Todo } from "../interface/task";
import * as taskModel from "../model/task";

export const addTask = (newTask: Todo) => {
  const task = taskModel.addTask(newTask);
  return true;
};

export const getTasks = () => {
  const tasks = taskModel.getTasks();
  if (tasks.length === 0) return null;
  return tasks;
};

export const updateTask = (id: number, updatedData: Todo) => {
  const index = taskModel.findTaskIndexById(id);
  if (index == -1) return null;
  else return taskModel.updateTask(id, updatedData, index);
};

export const deleteTask = (id: number) => {
  const index = taskModel.findTaskIndexById(id);
  if (index == -1) return null;
  else return taskModel.deleteTask(id);
};

export const getTasksByUserId = (userId: number) => {
  const tasks = taskModel.findTasksByUserId(userId);
  console.log("tasks", tasks);
  if (!tasks) return Error("Task not found");
  return tasks;
};
