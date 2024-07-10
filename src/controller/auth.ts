import { Request, Response } from "express";
import * as authServices from "../service/auth";

export const login = async (req: Request, res: Response) => {
  const { body } = req;
  const data = await authServices.login(body);
  if (data) {
    res.status(200).json({ message: data });
  } else {
    res.status(404).json({ message: "invalid email or password" });
  }
};

export const signUp = async (req: Request, res: Response) => {
  const { body } = req;
  const data = await authServices.signUp(body);
  if (data) {
    res.status(201).json({ message: "created successfully" });
  } else {
    res.status(409).json({ message: "email already exists" });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.split(" ");
    const newToken = await authServices.refreshToken(token[1]);

    res.status(201).json(newToken);
  } else {
    res.status(404).json({ message: "header not dound" });
  }
};
