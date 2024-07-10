import { NextFunction } from "express";
import { Todo } from "../interface/task";
import * as taskModel from "../model/task";
import { notFoundError } from "../middleware/errorHandler";

export const addTask = (newTask: Todo, userId: number) => {
  const task = taskModel.addTask(newTask, userId);
  return true;
};

export const getTasks = (userId: number) => {
  const tasks = taskModel.findTasksByUserId(userId);
  if (tasks.length === 0) return null;
  return tasks;
};

export const updateTask = (id: number, updatedData: Todo, userId: number) => {
  // const index = taskModel.findTaskIndexById(id);
  // if (index == -1) return null;
  // else {
  //   const task = taskModel.findTaskById(id, userId);
  // }

  // return taskModel.updateTask(id, updatedData, index);

  const task = taskModel.findTaskById(id, userId);
  if (!task) return null;

  if (task.userId !== userId) {
    return null; // User ID does not match
  }

  const index = taskModel.findTaskIndexById(id);
  if (index == -1) return null;

  return taskModel.updateTask(id, updatedData, index);
};

export const deleteTask = (id: number) => {
  const index = taskModel.findTaskIndexById(id);
  if (index == -1) return null;
  else return taskModel.deleteTask(id);
};

// export const getTasksByUserId = (userId: number, next: NextFunction) => {
//   const tasks = taskModel.findTasksByUserId(userId);
//   console.log("Tasks", tasks.length);
//   if (tasks.length > 0) {
//     return tasks;
//   } else {
//     return "error";
//   }
// };
