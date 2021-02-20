import { NextFunction, Request, Response } from 'express';

export default function (req: Request, res: Response, next: NextFunction) {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self' https://cdn.jsdelivr.net 'unsafe-eval'; style-src 'self'; frame-src 'self'"
  );
  return next();
}
