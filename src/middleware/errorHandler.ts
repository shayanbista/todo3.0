import httpStatusCodes from "http-status-codes";
import { NextFunction, Response } from "express";
import { Request } from "express";
import { UnauthenticatedError } from "../error/UnauthenticatedError";
import { BadRequestError } from "../error/BadRequestError";
import loggerWithNameSpace from "../utils/logger";
import { ForbiddenError } from "../error/ForbiddenError";

const logger = loggerWithNameSpace("Errorhandler");

export const notFoundError = (req: Request, res: Response) => {
  return res.status(httpStatusCodes.NOT_FOUND).json({ message: "Not found" });
};

// export const genericErrorHandler = (
//   error: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (error.stack) {
//     logger.error(error.stack);
//   }
//   if (error instanceof UnauthenticatedError)
//     return res
//       .status(httpStatusCodes.UNAUTHORIZED)
//       .json({ message: "Access denied" });
//   else
//     return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
//       message: "Internal server error",
//     });
// };

export function genericErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.stack) {
    logger.error(error.stack);
  }

  if (error instanceof UnauthenticatedError) {
    return res.status(httpStatusCodes.UNAUTHORIZED).json({
      message: error.message,
    });
  } else if (error instanceof BadRequestError) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  } else if (error instanceof ForbiddenError) {
    return res.status(httpStatusCodes.FORBIDDEN).json({
      message: error.message,
    });
  }

  return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Internal server error",
  });
}
