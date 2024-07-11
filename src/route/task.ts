import { Router } from "express";
import { addTask, updateTask, deleteTask, getTasks } from "../controller/task";
import { authenticate } from "../middleware/auth";

const todoRouter = Router();
todoRouter.post("/", authenticate, addTask);
todoRouter.get("/", authenticate, getTasks);
todoRouter.put("/:id", authenticate, updateTask);
todoRouter.delete("/:id", authenticate, deleteTask);

export default todoRouter;
