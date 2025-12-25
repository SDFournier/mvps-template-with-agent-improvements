import { ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RolesGuard } from "./roles.guard";

describe("RolesGuard", () => {
  it("allows when no roles are required", () => {
    const reflector = { getAllAndOverride: jest.fn().mockReturnValue(undefined) } as unknown as Reflector;
    const guard = new RolesGuard(reflector);
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({ getRequest: () => ({ user: { role: "user" } }) })
    } as any;

    expect(guard.canActivate(context)).toBe(true);
  });

  it("blocks when user role is insufficient", () => {
    const reflector = { getAllAndOverride: jest.fn().mockReturnValue(["admin"]) } as unknown as Reflector;
    const guard = new RolesGuard(reflector);
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({ getRequest: () => ({ user: { role: "user" } }) })
    } as any;

    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });
});
