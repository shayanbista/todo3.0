import { NextFunction, Response } from "express";
import { Request } from "../interface/request";
import { verify } from "jsonwebtoken";
import config from "../config";
import { User } from "../interface/user";
import { UnauthenticatedError } from "../error/UnauthenticatedError";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    if (!authorization) {
      // return res.status(401).json({ error: "No authentication header" });
      next(new UnauthenticatedError("Unauthenticated"));
      return;
    }
  }

  const token = authorization.split(" ");

  if (token.length !== 2 || token[0] !== "Bearer") {
    // if (!authorization) {
    //   return res.status(401).json({ error: "Access denied!" });
    // }
    next(new UnauthenticatedError("Access denied"));
    return;
  }
  try {
    const user = verify(token[1], config.jwt.secret!) as User;
    req.user = user;

    next();
  } catch (error) {
    throw new UnauthenticatedError("error");
  }
};

export const authorize = (permission: string) => {
  console.log("authorzie");
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;
    console.log(user);

    if (!user.permissions.includes(permission)) {
      next(new UnauthenticatedError("Forbidden"));
    }
    next();
  };
};
