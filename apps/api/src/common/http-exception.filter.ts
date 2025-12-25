import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException
} from "@nestjs/common";

type ErrorPayload = {
  ok: false;
  statusCode: number;
  error: string;
  message: string;
  details?: unknown;
  path: string;
  timestamp: string;
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const timestamp = new Date().toISOString();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const responseBody = exception.getResponse();
      const payload = this.buildPayload(
        status,
        exception.constructor.name,
        responseBody,
        request?.url,
        timestamp
      );
      response.status(status).json(payload);
      return;
    }

    const payload: ErrorPayload = {
      ok: false,
      statusCode: 500,
      error: "InternalServerError",
      message: "Unexpected error",
      path: request?.url ?? "",
      timestamp
    };

    response.status(500).json(payload);
  }

  private buildPayload(
    status: number,
    error: string,
    responseBody: unknown,
    path: string,
    timestamp: string
  ): ErrorPayload {
    let message = "Request failed";
    let details: unknown = undefined;

    if (typeof responseBody === "string") {
      message = responseBody;
    } else if (responseBody && typeof responseBody === "object") {
      const body = responseBody as Record<string, unknown>;
      message = String(body.message ?? body.error ?? message);
      details = body.errors ?? body.details;
    }

    return {
      ok: false,
      statusCode: status,
      error,
      message,
      details,
      path,
      timestamp
    };
  }
}
