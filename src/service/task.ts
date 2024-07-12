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
  const task = taskModel.findTaskById(id, userId);
  if (!task) return null;

  if (task.userId !== userId) {
    return null;
  }

  const index = taskModel.findTaskIndexById(id);
  if (index == -1) return null;

  return taskModel.updateTask(id, updatedData, index);
};

export const deleteTask = (id: number, userId: number) => {
  const task = taskModel.findTaskById(id, userId);
  console.log("task", task);
  if (!task) return null;

  if (task.userId !== userId) {
    return null;
  }

  const index = taskModel.findTaskIndexById(id);

  if (index === -1) return null;
  else {
    taskModel.deleteTask(index);
    return true;
  }
};
