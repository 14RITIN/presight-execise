import { beforeEach, expect, it, vi } from 'vitest';
import { redis } from '../src/redis';
import { findUserFilterOptions } from '../src/modules/users/user.repository';
import { getUserFilterOptionsService } from '../src/modules/users/user.service';

vi.mock('../src/redis', () => ({
  redis: { status: 'ready', get: vi.fn(), set: vi.fn() },
}));
vi.mock('../src/modules/users/user.repository', () => ({
  findUserFilterOptions: vi.fn(),
}));

const options = { hobbies: ['Reading'], nationalities: ['Indian'] };

beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(findUserFilterOptions).mockReturnValue(options);
});

it('loads SQLite on a miss and caches options for five minutes', async () => {
  vi.mocked(redis!.get).mockResolvedValue(null);
  await expect(getUserFilterOptionsService()).resolves.toEqual(options);
  expect(findUserFilterOptions).toHaveBeenCalledOnce();
  expect(redis!.set).toHaveBeenCalledWith(
    'users:filter-options', JSON.stringify(options), 'EX', 300,
  );
});

it('returns a cache hit without querying SQLite', async () => {
  vi.mocked(redis!.get).mockResolvedValue(JSON.stringify(options));
  await expect(getUserFilterOptionsService()).resolves.toEqual(options);
  expect(findUserFilterOptions).not.toHaveBeenCalled();
  expect(redis!.set).not.toHaveBeenCalled();
});

it('falls back to SQLite when Redis is unavailable', async () => {
  vi.mocked(redis!.get).mockRejectedValue(new Error('Redis unavailable'));
  await expect(getUserFilterOptionsService()).resolves.toEqual(options);
  expect(findUserFilterOptions).toHaveBeenCalledOnce();
});

it('returns SQLite results even if the cache write fails', async () => {
  vi.mocked(redis!.get).mockResolvedValue(null);
  vi.mocked(redis!.set).mockRejectedValue(new Error('Redis unavailable'));
  await expect(getUserFilterOptionsService()).resolves.toEqual(options);
});
