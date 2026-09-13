import express from 'express';
import helmet from 'helmet';

import { apiRateLimiter } from './middleware/rate-limit.middleware';
import {
  errorHandler,
  notFoundHandler,
} from './middleware/error.middleware';
import userRoutes from './modules/users/user.routes';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');

  app.use(helmet());

  app.use(
    express.json({
      limit: '100kb',
    }),
  );

  app.use('/api', apiRateLimiter);

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/users', userRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}