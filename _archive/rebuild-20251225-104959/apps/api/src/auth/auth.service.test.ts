import { UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";
import { Session } from "./session.entity";

type Repo<T> = {
  findOne: jest.Mock;
  create: jest.Mock;
  save: jest.Mock;
  delete: jest.Mock;
};

const createUserRepo = (): Repo<User> => ({
  findOne: jest.fn(),
  create: jest.fn((data) => ({ id: 1, ...data })),
  save: jest.fn(async (data) => ({ id: 1, ...data })),
  delete: jest.fn()
});

const createSessionRepo = (): Repo<Session> => ({
  findOne: jest.fn(),
  create: jest.fn((data) => ({ id: 1, ...data })),
  save: jest.fn(async (data) => ({ id: 1, ...data })),
  delete: jest.fn()
});

describe("AuthService", () => {
  beforeEach(() => {
    delete process.env.ADMIN_EMAILS;
  });

  it("assigns admin role when email is configured", async () => {
    process.env.ADMIN_EMAILS = "admin@example.com";
    const users = createUserRepo();
    const sessions = createSessionRepo();
    users.findOne.mockResolvedValue(null);

    const service = new AuthService(users as any, sessions as any);
    const user = await service.register("admin@example.com", "password");

    expect(user.role).toBe("admin");
  });

  it("rejects login with invalid credentials", async () => {
    const users = createUserRepo();
    const sessions = createSessionRepo();
    users.findOne.mockResolvedValue(null);

    const service = new AuthService(users as any, sessions as any);
    await expect(service.login("test@example.com", "secret")).rejects.toThrow(
      UnauthorizedException
    );
  });

  it("invalidates expired sessions", async () => {
    const users = createUserRepo();
    const sessions = createSessionRepo();
    const past = new Date(Date.now() - 1000);
    sessions.findOne.mockResolvedValue({
      id: 1,
      token: "token",
      expiresAt: past,
      user: { id: 1 } as User
    });

    const service = new AuthService(users as any, sessions as any);
    const user = await service.validateSession("token");

    expect(user).toBeNull();
    expect(sessions.delete).toHaveBeenCalledWith({ id: 1 });
  });

  it("logs out by deleting the session token", async () => {
    const users = createUserRepo();
    const sessions = createSessionRepo();
    const service = new AuthService(users as any, sessions as any);

    await service.logout("token");

    expect(sessions.delete).toHaveBeenCalledWith({ token: "token" });
  });
});
