import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { DataSource } from "typeorm";
import { promises as fs } from "fs";
import path from "path";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { BooksModule } from "../books/books.module";
import { UploadsModule } from "../uploads/uploads.module";
import { AdminModule } from "../admin/admin.module";
import { Book } from "../books/book.entity";
import { User } from "../auth/user.entity";
import { Session } from "../auth/session.entity";
import { Upload } from "../uploads/upload.entity";
import { REDIS_CLIENT } from "../redis/redis.module";

const uploadsDir = path.join(process.cwd(), "tmp-uploads-e2e");
const redisMock = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  keys: jest.fn().mockResolvedValue([]),
  ping: jest.fn().mockResolvedValue("PONG")
};

describe("API e2e and contract tests", () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    process.env.UPLOADS_DIR = uploadsDir;
    process.env.UPLOAD_MAX_MB = process.env.UPLOAD_MAX_MB || "2";
    process.env.CACHE_TTL_SECONDS = process.env.CACHE_TTL_SECONDS || "5";
    process.env.SESSION_DAYS = process.env.SESSION_DAYS || "7";
    process.env.ADMIN_EMAILS = process.env.ADMIN_EMAILS || "admin@example.com";

    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "sqljs",
          autoSave: false,
          location: "test",
          entities: [Book, User, Session, Upload],
          synchronize: true
        }),
        AuthModule,
        BooksModule,
        UploadsModule,
        AdminModule
      ]
    })
      .overrideProvider(REDIS_CLIENT)
      .useValue(redisMock)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    dataSource = app.get(DataSource);
  });

  afterAll(async () => {
    await app.close();
    await fs.rm(uploadsDir, { recursive: true, force: true });
  });

  afterEach(async () => {
    await resetDatabase(dataSource);
    await fs.rm(uploadsDir, { recursive: true, force: true });
  });

  it("supports auth + books CRUD flow", async () => {
    const registerResponse = await request(app.getHttpServer())
      .post("/auth/register")
      .send({ email: "user@example.com", password: "password" })
      .expect(201);

    expect(registerResponse.body.user).toMatchObject({
      email: "user@example.com",
      role: "user"
    });
    expect(registerResponse.body.user.id).toBeDefined();

    const loginResponse = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ email: "user@example.com", password: "password" })
      .expect(201);

    expect(loginResponse.body.token).toEqual(expect.any(String));
    expect(loginResponse.body.user.email).toBe("user@example.com");

    const token = loginResponse.body.token as string;

    const meResponse = await request(app.getHttpServer())
      .get("/auth/me")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(meResponse.body.user).toMatchObject({
      email: "user@example.com",
      role: "user"
    });

    const createResponse = await request(app.getHttpServer())
      .post("/books")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Book 1", author: "Author" })
      .expect(201);

    expect(createResponse.body.title).toBe("Book 1");
    expect(createResponse.body.author).toBe("Author");

    const listResponse = await request(app.getHttpServer())
      .get("/books?page=1&pageSize=5")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(listResponse.body.items)).toBe(true);
    expect(listResponse.body.pagination.page).toBe(1);

    const bookId = listResponse.body.items[0].id as number;
    const updateResponse = await request(app.getHttpServer())
      .patch(`/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Book 1 Updated" })
      .expect(200);

    expect(updateResponse.body.title).toBe("Book 1 Updated");

    const deleteResponse = await request(app.getHttpServer())
      .delete(`/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(deleteResponse.body.ok).toBe(true);
  });

  it("enforces roles on admin endpoints", async () => {
    await request(app.getHttpServer())
      .post("/auth/register")
      .send({ email: "user@example.com", password: "password" })
      .expect(201);

    const userLogin = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ email: "user@example.com", password: "password" })
      .expect(201);

    await request(app.getHttpServer())
      .get("/admin/overview")
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .expect(403);

    await request(app.getHttpServer())
      .post("/auth/register")
      .send({ email: "admin@example.com", password: "password" })
      .expect(201);

    const adminLogin = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ email: "admin@example.com", password: "password" })
      .expect(201);

    const overview = await request(app.getHttpServer())
      .get("/admin/overview")
      .set("Authorization", `Bearer ${adminLogin.body.token}`)
      .expect(200);

    expect(overview.body.userCount).toEqual(expect.any(Number));
    expect(overview.body.message).toEqual(expect.any(String));
  });

  it("uploads files and returns metadata", async () => {
    await request(app.getHttpServer())
      .post("/auth/register")
      .send({ email: "user@example.com", password: "password" })
      .expect(201);

    const loginResponse = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ email: "user@example.com", password: "password" })
      .expect(201);

    const token = loginResponse.body.token as string;
    const contentBase64 = Buffer.from("hello").toString("base64");

    const uploadResponse = await request(app.getHttpServer())
      .post("/uploads")
      .set("Authorization", `Bearer ${token}`)
      .send({ filename: "demo.txt", contentBase64, mimeType: "text/plain" })
      .expect(201);

    expect(uploadResponse.body.id).toEqual(expect.any(Number));
    expect(uploadResponse.body.filename).toBe("demo.txt");

    const uploadId = uploadResponse.body.id as number;
    const metadataResponse = await request(app.getHttpServer())
      .get(`/uploads/${uploadId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(metadataResponse.body.filename).toBe("demo.txt");

    await request(app.getHttpServer())
      .get(`/uploads/${uploadId}/file`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});

async function resetDatabase(dataSource: DataSource) {
  if (dataSource.options.type === "mysql") {
    const tables = ["sessions", "users", "books", "uploads"];
    await dataSource.query("SET FOREIGN_KEY_CHECKS=0;");
    for (const table of tables) {
      await dataSource.query(`TRUNCATE TABLE ${table};`);
    }
    await dataSource.query("SET FOREIGN_KEY_CHECKS=1;");
    return;
  }

  await dataSource.synchronize(true);
}
