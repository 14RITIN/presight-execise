import Redis from 'ioredis';

// Without REDIS_URL, local development continues to use SQLite directly.
export const redis = process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL, {
      lazyConnect: true,
      connectTimeout: 500,
      commandTimeout: 500,
      enableOfflineQueue: false,
      maxRetriesPerRequest: 1,
      retryStrategy: () => 5000,
    })
  : undefined;

redis?.on('error', (error: NodeJS.ErrnoException) => {
  // Do not log the connection URL, which may contain credentials.
  console.warn('[redis] unavailable; filter options will fall back to SQLite', {
    name: error.name,
    code: error.code,
  });
});
