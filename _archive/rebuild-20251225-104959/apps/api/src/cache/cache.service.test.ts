import { CacheService } from "./cache.service";

describe("CacheService", () => {
  const redis = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    keys: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns null on invalid JSON", async () => {
    redis.get.mockResolvedValue("not-json");
    const service = new CacheService(redis as any);

    const result = await service.getJson("key");

    expect(result).toBeNull();
  });

  it("sets JSON with TTL when provided", async () => {
    const service = new CacheService(redis as any);

    await service.setJson("key", { ok: true }, 10);

    expect(redis.set).toHaveBeenCalledWith("key", JSON.stringify({ ok: true }), "EX", 10);
  });

  it("skips delete when no keys match", async () => {
    redis.keys.mockResolvedValue([]);
    const service = new CacheService(redis as any);

    await service.deleteByPrefix("prefix:");

    expect(redis.del).not.toHaveBeenCalled();
  });
});
