import { Request, Response } from 'express';

export const notFoundHandler = (
  req: Request,
  res: Response,
): void => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`,
    },
  });
};

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
): void => {
  console.error(error);

  res.status(500).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Unable to process the request',
    },
  });
};