import { Request, Response, NextFunction } from 'express';

interface Error {
  status?: number;
  message?: string;
  stack?: string;
}

export default function (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
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
