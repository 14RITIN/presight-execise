import express from 'express';

import userRoutes from './modules/users/user.routes';

export function createApp() {
  const app = express();

  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/users', userRoutes);

  return app;
}