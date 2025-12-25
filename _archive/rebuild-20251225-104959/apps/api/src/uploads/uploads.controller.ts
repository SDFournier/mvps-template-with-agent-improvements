import { BadRequestException, Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { UploadCreateDto, UploadResponseDto } from "@repo/shared";
import { UploadsService } from "./uploads.service";
import { StreamableFile } from "@nestjs/common";
import { createReadStream } from "fs";

@Controller("uploads")
@UseGuards(AuthGuard)
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  async create(@Body() body: UploadCreateDto): Promise<UploadResponseDto> {
    const upload = await this.uploadsService.create(body);
    return {
      id: upload.id,
      filename: upload.originalName,
      mimeType: upload.mimeType,
      size: upload.size,
      createdAt: upload.createdAt.toISOString()
    };
  }

  @Get(":id")
  async get(@Param("id") idParam: string): Promise<UploadResponseDto> {
    const id = this.parseId(idParam);
    const upload = await this.uploadsService.findById(id);
    return {
      id: upload.id,
      filename: upload.originalName,
      mimeType: upload.mimeType,
      size: upload.size,
      createdAt: upload.createdAt.toISOString()
    };
  }

  @Get(":id/file")
  async download(@Param("id") idParam: string): Promise<StreamableFile> {
    const id = this.parseId(idParam);
    const { path, upload } = await this.uploadsService.getFilePath(id);
    const file = createReadStream(path);
    return new StreamableFile(file, {
      type: upload.mimeType,
      disposition: `attachment; filename="${upload.originalName}"`
    });
  }

  private parseId(value: string): number {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < 1) {
      throw new BadRequestException({ message: "Invalid id" });
    }
    return parsed;
  }
}
