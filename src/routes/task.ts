import { Router } from "express";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  getTasksByUserId,
} from "../controller/task";
import { authenticate } from "../middleware/auth";

const todoRouter = Router();
todoRouter.post("/", authenticate, addTask);
todoRouter.get("/", authenticate, getTasks);
todoRouter.get("/:userId", authenticate, getTasksByUserId);
todoRouter.put("/:id", authenticate, updateTask);
todoRouter.delete("/:id", authenticate, deleteTask);

export default todoRouter;
