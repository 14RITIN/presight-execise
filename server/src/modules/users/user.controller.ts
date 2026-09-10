import { Request, Response } from 'express';

import { userQuerySchema } from './user.schema';

export const getUsers = (req: Request, res: Response): void => {
  const result = userQuerySchema.safeParse(req.query);

  if (!result.success) {
    res.status(400).json({
      error: {
        code: 'INVALID_QUERY',
        message: 'Invalid query parameters',
        details: result.error.flatten(),
      },
    });

    return;
  }

  res.status(200).json({
    query: result.data,
  });
};