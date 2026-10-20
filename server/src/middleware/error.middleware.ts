import { NextFunction, Request, Response } from "express";

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: `Route ${req.method} ${req.path} not found`,
    },
  });
};

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const path = req.originalUrl.split('?')[0];
  // Error messages and attached properties can contain request bodies or secrets.
  // Keep the error type and stack frames, without dumping the error object.
  console.error(`[error] ${req.method} ${path}`, {
    name: error instanceof Error ? error.name : 'UnknownError',
    stack: error instanceof Error
      ? error.stack?.split('\n').filter((line) => /^\s+at /.test(line)).join('\n')
      : undefined,
  });

  // Express must finish handling errors after a response has already started.
  if (res.headersSent) {
    next(error);
    return;
  }

  res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Unable to process the request",
    },
  });
};
