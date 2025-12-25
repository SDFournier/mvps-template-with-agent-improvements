import { Module } from "@nestjs/common";
import Redis from "ioredis";

export const REDIS_CLIENT = "REDIS_CLIENT";

@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: () => {
        const host = process.env.REDIS_HOST || "localhost";
        const port = Number(process.env.REDIS_PORT) || 6378;
        return new Redis({ host, port });
      }
    }
  ],
  exports: [REDIS_CLIENT]
})
export class RedisModule {}
