import { NextFunction, Response } from "express";
import { Request } from "../interface/request";
import * as userService from "../service/user";
import httpStatusCodes from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";
import { ConflictError } from "../error/ConflictError";

export const getUsers = (req: Request, res: Response) => {
  const users = userService.getUsers();
  console.log("users", users);
  if (users) res.status(200).json({ message: users });
  else
    res
      .status(httpStatusCodes.BAD_REQUEST)
      .json({ message: "User not found!" });
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;
  const data = await userService.createUser(body);
  if (!data) {
    next(new ConflictError("email already exists"));
  }
  res.status(httpStatusCodes.CREATED).json({ message: "created successfully" });
};

// export const createUser = as(req: Request, res: Response) => {
//   const { body } = req;

//     const data = await authServices.signUp(body);
//     if (!data) {
//       next(new ConflictError("email already exists"));
//     }
//     res
//       .status(httpStatusCodes.CREATED)
//       .json({ message: "created successfully" });

//   const users = userService.getUsers();
//   console.log("users", users);
//   if (users) res.status(200).json({ message: users });
//   else
//     res
//       .status(httpStatusCodes.BAD_REQUEST)
//       .json({ message: "User not found!" });
// };

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  const user = await userService.updateUser(Number(id), data);
  if (user) {
    console.log(user);
    res.status(200).json({ message: user });
  } else {
    res
      .status(httpStatusCodes.BAD_REQUEST)
      .json({ message: "User not found!" });
  }
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const message = userService.deleteUsers(id);
  res.json(message);
};
