import { Request, Response, NextFunction } from "express";
import { config } from "../config/config";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    errorStack: config.env === "development" ? err.stack : "",
  });
};

export default globalErrorHandler;
