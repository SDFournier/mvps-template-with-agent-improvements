import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UploadsModule } from "../uploads/uploads.module";
import { Upload } from "../uploads/upload.entity";
import { User } from "../auth/user.entity";
import { Session } from "../auth/session.entity";
import { BooksModule } from "../books/books.module";
import { Book } from "../books/book.entity";
import { AdminModule } from "../admin/admin.module";
import { REDIS_CLIENT } from "../redis/redis.module";

const repoMock = () => ({
  findOne: jest.fn(),
  findAndCount: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
  delete: jest.fn(),
  count: jest.fn()
});

const redisMock = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  keys: jest.fn()
};

describe("Module wiring smoke tests", () => {
  it("compiles UploadsModule with auth dependencies", async () => {
    await Test.createTestingModule({
      imports: [UploadsModule]
    })
      .overrideProvider(getRepositoryToken(Upload))
      .useValue(repoMock())
      .overrideProvider(getRepositoryToken(User))
      .useValue(repoMock())
      .overrideProvider(getRepositoryToken(Session))
      .useValue(repoMock())
      .compile();
  });

  it("compiles BooksModule with cache and auth dependencies", async () => {
    await Test.createTestingModule({
      imports: [BooksModule]
    })
      .overrideProvider(getRepositoryToken(Book))
      .useValue(repoMock())
      .overrideProvider(getRepositoryToken(User))
      .useValue(repoMock())
      .overrideProvider(getRepositoryToken(Session))
      .useValue(repoMock())
      .overrideProvider(REDIS_CLIENT)
      .useValue(redisMock)
      .compile();
  });

  it("compiles AdminModule with auth dependencies", async () => {
    await Test.createTestingModule({
      imports: [AdminModule]
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(repoMock())
      .overrideProvider(getRepositoryToken(Session))
      .useValue(repoMock())
      .compile();
  });
});
