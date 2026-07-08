import { createRedisState } from '@chat-adapter/state-redis';
import { Redis } from '@upstash/redis';

let redisClient: Redis | null = null;
let redisStateAdapter: ReturnType<typeof createRedisState> | null = null;

function readRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is required for KV access.`);
  }
  return value;
}

export function getRedisClient(): Redis {
  redisClient ??= new Redis({
    url: readRequiredEnv('KV_REST_API_URL'),
    token: readRequiredEnv('KV_REST_API_TOKEN'),
  });

  return redisClient;
}

/**
 * Redis State for Chat SDK
 */
export function getRedisState(): ReturnType<typeof createRedisState> {
  redisStateAdapter ??= createRedisState();
  return redisStateAdapter;
}

export const redis = {
  eval: (...args: Parameters<Redis['eval']>) => getRedisClient().eval(...args),
  set: (...args: Parameters<Redis['set']>) => getRedisClient().set(...args),
};

export const get = (...args: Parameters<Redis['get']>) =>
  getRedisClient().get(...args);

export const set = (...args: Parameters<Redis['set']>) =>
  getRedisClient().set(...args);

export const del = (...args: Parameters<Redis['del']>) =>
  getRedisClient().del(...args);

export const expire = (...args: Parameters<Redis['expire']>) =>
  getRedisClient().expire(...args);
