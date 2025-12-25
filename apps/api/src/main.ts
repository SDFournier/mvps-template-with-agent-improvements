import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { HttpExceptionFilter } from "./common/http-exception.filter";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());

  const rawCorsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";
  const corsOrigin = rawCorsOrigin.includes(",")
    ? rawCorsOrigin
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean)
    : rawCorsOrigin.trim();

  app.enableCors({
    origin: corsOrigin,
  });

  const port = Number(process.env.PORT) || 3001;
  await app.listen(port);
}

bootstrap();
