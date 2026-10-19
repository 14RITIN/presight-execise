import request from 'supertest';
import { expect, it, vi } from 'vitest';

import { createApp } from '../src/app';

// These routes do not query SQLite; avoid opening the local database on import.
vi.mock('../src/db/database', () => ({ db: {} }));

it('GET /api/health returns the health status', async () => {
  const response = await request(createApp()).get('/api/health');

  expect(response.status).toBe(200);
  expect(response.body).toEqual({ status: 'ok' });
});

it('GET /api/unknown returns NOT_FOUND', async () => {
  const response = await request(createApp()).get('/api/unknown');

  expect(response.status).toBe(404);
  expect(response.body.error.code).toBe('NOT_FOUND');
});
