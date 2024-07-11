import { Router } from "express";
import { getUsers, updateUser, deleteUser } from "../controller/user";
import { authenticate, authorize } from "../middleware/auth";
import { createUser } from "../controller/user";

const userRouter = Router();
userRouter.post("/", authorize("users.post"), createUser);
userRouter.get("/", authenticate, authorize("users.get"), getUsers);
userRouter.put("/:id", authenticate, authorize("users.put"), updateUser);
userRouter.delete("/:id", authenticate, authorize("users.delete"), deleteUser);

export default userRouter;
