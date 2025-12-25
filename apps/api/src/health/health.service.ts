import { Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { DataSource } from "typeorm";
import { REDIS_CLIENT } from "../redis/redis.module";

type HealthResponse = {
  ok: boolean;
  mysql: boolean;
  redis: boolean;
  timestamp: string;
};

@Injectable()
export class HealthService {
  constructor(
    private readonly dataSource: DataSource,
    @Inject(REDIS_CLIENT) private readonly redis: Redis
  ) {}

  async check(): Promise<HealthResponse> {
    const [mysql, redis] = await Promise.all([
      this.checkMysql(),
      this.checkRedis()
    ]);

    return {
      ok: mysql && redis,
      mysql,
      redis,
      timestamp: new Date().toISOString()
    };
  }

  private async checkMysql(): Promise<boolean> {
    try {
      await this.dataSource.query("SELECT 1");
      return true;
    } catch {
      return false;
    }
  }

  private async checkRedis(): Promise<boolean> {
    try {
      const response = await this.redis.ping();
      return response === "PONG";
    } catch {
      return false;
    }
  }
}
