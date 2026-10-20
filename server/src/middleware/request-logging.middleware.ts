import { NextFunction, Request, Response } from 'express';

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const startedAt = performance.now();
  const method = req.method;
  // Capture the full path before routing, without query parameters.
  const path = req.originalUrl.split('?')[0];

  res.once('finish', () => {
    const duration = Math.round(performance.now() - startedAt);
    console.log(`${method} ${path} ${res.statusCode} ${duration}ms`);
  });

  next();
};
