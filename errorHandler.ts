import { Request, Response, NextFunction } from 'express';

export interface ResponseError extends Error {
  status?: number;
  stack?: string;
}

export default function (
  error: ResponseError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }
  res.json({
    message: error.message,
    stack: error.stack,
  });
}
