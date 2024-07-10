import httpStatusCodes from "http-status-codes";
import { NextFunction, Response } from "express";
import { Request } from "express";
import { UnauthenticatedError } from "../error/UnauthenticatedError";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("Errorhandler");

export const notFoundError = (req: Request, res: Response) => {
  return res.status(httpStatusCodes.NOT_FOUND).json({ message: "Not found" });
};

export const genericErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.stack) {
    logger.error(error.stack);
  }
  if (error instanceof UnauthenticatedError)
    return res
      .status(httpStatusCodes.UNAUTHORIZED)
      .json({ message: "Access denied" });
  else
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
};
