import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UploadCreateDto } from "@repo/shared";
import { randomBytes } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { Upload } from "./upload.entity";

@Injectable()
export class UploadsService {
  constructor(@InjectRepository(Upload) private readonly uploads: Repository<Upload>) {}

  async create(payload: UploadCreateDto): Promise<Upload> {
    const filename = payload.filename?.trim();
    if (!filename) {
      throw new BadRequestException({ message: "Filename required" });
    }
    if (!payload.contentBase64) {
      throw new BadRequestException({ message: "File content required" });
    }

    const buffer = this.decodeBase64(payload.contentBase64);
    const maxSize = this.getMaxUploadBytes();
    if (buffer.byteLength > maxSize) {
      throw new BadRequestException({ message: "File too large" });
    }

    const storedName = `${Date.now()}-${randomBytes(8).toString("hex")}`;
    const uploadsDir = this.getUploadsDir();
    await fs.mkdir(uploadsDir, { recursive: true });
    const filePath = path.join(uploadsDir, storedName);
    await fs.writeFile(filePath, buffer);

    const entity = this.uploads.create({
      originalName: filename,
      storedName,
      mimeType: payload.mimeType?.trim() || "application/octet-stream",
      size: buffer.byteLength
    });

    return this.uploads.save(entity);
  }

  async findById(id: number): Promise<Upload> {
    const upload = await this.uploads.findOne({ where: { id } });
    if (!upload) {
      throw new NotFoundException({ message: "Upload not found" });
    }
    return upload;
  }

  async getFilePath(id: number): Promise<{ upload: Upload; path: string }> {
    const upload = await this.findById(id);
    const filePath = path.join(this.getUploadsDir(), upload.storedName);
    return { upload, path: filePath };
  }

  private decodeBase64(value: string): Buffer {
    try {
      return Buffer.from(value, "base64");
    } catch {
      throw new BadRequestException({ message: "Invalid base64" });
    }
  }

  private getUploadsDir(): string {
    const dir = process.env.UPLOADS_DIR || "uploads";
    return path.resolve(process.cwd(), dir);
  }

  private getMaxUploadBytes(): number {
    const raw = Number(process.env.UPLOAD_MAX_MB);
    const maxMb = Number.isFinite(raw) && raw > 0 ? raw : 2;
    return Math.floor(maxMb * 1024 * 1024);
  }
}
