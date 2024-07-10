import { Request } from "../interface/request";
import { Response } from "express";
import * as taskService from "../service/task";
import { Roles } from "../constant/Roles";

export const addTask = (req: Request, res: Response) => {
  const newTask = req.body;
  const task = taskService.addTask(newTask);
  res.status(201).json({ message: "Succesfully added!" });
};

export const getTasks = (req: Request, res: Response) => {
  try {
    const user = req.user!;
    let tasks;
    if (user.role === Roles.SUPERADMIN) {
      tasks = taskService.getTasks();
    } else {
      const id = user.id;
      tasks = taskService.getTasksByUserId(id);
    }
    return res.json(tasks);
  } catch (err) {
    console.log(err);
  }
};

export const updateTask = (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const exisitingTask = taskService.updateTask(Number(id), data);
  if (!exisitingTask) {
    res.status(404).json({ message: "List is empty!" });
  } else {
    res.status(201).json({ message: "Updated successfully!" });
  }
};

export const deleteTask = (req: Request, res: Response) => {
  const id = req.params;
  const deleteTask = taskService.deleteTask(Number(id));
  if (!deleteTask) {
    res.status(404).json({ message: "List is empty!" });
  } else {
    res.status(201).json({ message: "deleted successfully!" });
  }
};

export const getTasksByUserId = (req: Request, res: Response) => {
  const id = req.params.userId;
  console.log("id", id);
  try {
    const message = taskService.getTasksByUserId(Number(id));
    res.json({ message });
  } catch (err) {
    console.log("err", err);
  }
};
