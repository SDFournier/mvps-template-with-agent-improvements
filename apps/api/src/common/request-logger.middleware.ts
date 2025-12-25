import { Injectable, Logger, NestMiddleware } from "@nestjs/common";

type RequestLike = {
  method?: string;
  originalUrl?: string;
  headers?: Record<string, string | undefined>;
};

type ResponseLike = {
  statusCode?: number;
  on: (event: string, listener: () => void) => void;
};

type Next = () => void;

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger("HTTP");

  use(request: RequestLike, response: ResponseLike, next: Next): void {
    const startedAt = Date.now();
    const { method, originalUrl } = request;
    const requestId = request.headers?.["x-request-id"];

    response.on("finish", () => {
      const duration = Date.now() - startedAt;
      const status = response.statusCode ?? 0;
      const idPart = requestId ? ` requestId=${requestId}` : "";
      this.logger.log(`${method} ${originalUrl} ${status} ${duration}ms${idPart}`);
    });

    next();
  }
}
