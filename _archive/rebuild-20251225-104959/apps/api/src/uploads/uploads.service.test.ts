import { UploadsService } from "./uploads.service";
import { Upload } from "./upload.entity";
import { promises as fs } from "fs";
import path from "path";

type Repo<T> = {
  create: jest.Mock;
  save: jest.Mock;
  findOne: jest.Mock;
};

describe("UploadsService", () => {
  const uploadsRepo: Repo<Upload> = {
    create: jest.fn((data) => ({ id: 1, ...data })),
    save: jest.fn(async (data) => ({
      id: 1,
      createdAt: new Date(),
      ...data
    })),
    findOne: jest.fn()
  };

  const uploadsDir = path.join(process.cwd(), "tmp-uploads-test");

  beforeEach(async () => {
    process.env.UPLOADS_DIR = uploadsDir;
    process.env.UPLOAD_MAX_MB = "1";
    uploadsRepo.findOne.mockReset();
    await fs.rm(uploadsDir, { recursive: true, force: true });
  });

  afterEach(async () => {
    await fs.rm(uploadsDir, { recursive: true, force: true });
  });

  it("stores file and metadata", async () => {
    const service = new UploadsService(uploadsRepo as any);
    const payload = {
      filename: "demo.txt",
      contentBase64: Buffer.from("hello").toString("base64"),
      mimeType: "text/plain"
    };

    const upload = await service.create(payload);
    const filePath = path.join(uploadsDir, upload.storedName);

    const stats = await fs.stat(filePath);
    expect(stats.size).toBeGreaterThan(0);
  });

  it("rejects files bigger than the limit", async () => {
    process.env.UPLOAD_MAX_MB = "0.0001";
    const service = new UploadsService(uploadsRepo as any);
    const payload = {
      filename: "big.txt",
      contentBase64: Buffer.alloc(2000).toString("base64"),
      mimeType: "text/plain"
    };

    await expect(service.create(payload)).rejects.toThrow("File too large");
  });
});
