import { Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { REDIS_CLIENT } from "../redis/redis.module";

@Injectable()
export class CacheService {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async getJson<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);
    if (!value) {
      return null;
    }
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }

  async setJson(key: string, payload: unknown, ttlSeconds: number): Promise<void> {
    const value = JSON.stringify(payload);
    if (ttlSeconds > 0) {
      await this.redis.set(key, value, "EX", ttlSeconds);
      return;
    }
    await this.redis.set(key, value);
  }

  async deleteByPrefix(prefix: string): Promise<void> {
    const keys = await this.redis.keys(`${prefix}*`);
    if (keys.length === 0) {
      return;
    }
    await this.redis.del(...keys);
  }
}
