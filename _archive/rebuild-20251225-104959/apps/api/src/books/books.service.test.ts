import { BooksService } from "./books.service";
import { Book } from "./book.entity";

type Repo<T> = {
  findAndCount: jest.Mock;
  findOne: jest.Mock;
  create: jest.Mock;
  save: jest.Mock;
  remove: jest.Mock;
};

describe("BooksService", () => {
  const repository: Repo<Book> = {
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn((data) => ({ id: 1, ...data })),
    save: jest.fn(async (data) => ({ id: 1, ...data })),
    remove: jest.fn()
  };

  const cache = {
    getJson: jest.fn(),
    setJson: jest.fn(),
    deleteByPrefix: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns cached list when available", async () => {
    const cached = {
      items: [{ id: 1, title: "Cached", author: null }],
      pagination: { page: 1, pageSize: 10, total: 1, totalPages: 1 }
    };
    cache.getJson.mockResolvedValue(cached);
    const service = new BooksService(repository as any, cache as any);

    const result = await service.list({ page: 1, pageSize: 10 });

    expect(result).toEqual(cached);
    expect(repository.findAndCount).not.toHaveBeenCalled();
  });

  it("invalidates cache on create", async () => {
    repository.create.mockReturnValue({ title: "Book" });
    repository.save.mockResolvedValue({ id: 1, title: "Book" });
    const service = new BooksService(repository as any, cache as any);

    await service.create({ title: "Book" });

    expect(cache.deleteByPrefix).toHaveBeenCalled();
  });
});
