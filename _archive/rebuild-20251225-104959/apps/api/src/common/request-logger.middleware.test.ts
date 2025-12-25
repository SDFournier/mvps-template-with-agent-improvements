import { RequestLoggerMiddleware } from "./request-logger.middleware";

describe("RequestLoggerMiddleware", () => {
  it("registers finish handler and calls next", () => {
    const middleware = new RequestLoggerMiddleware();
    const request = {
      method: "GET",
      originalUrl: "/health",
      headers: {}
    } as any;
    const response = {
      statusCode: 200,
      on: jest.fn()
    } as any;
    const next = jest.fn();

    middleware.use(request, response, next);

    expect(response.on).toHaveBeenCalledWith("finish", expect.any(Function));
    expect(next).toHaveBeenCalled();
  });
});
