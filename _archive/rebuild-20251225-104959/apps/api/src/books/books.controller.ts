import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from "@nestjs/common";
import {
  BookCreateDto,
  BookListResponseDto,
  BookUpdateDto,
  BookDto
} from "@repo/shared";
import { AuthGuard } from "../auth/auth.guard";
import { BooksService } from "./books.service";
import { ensureValid, FieldErrors, requireString } from "../common/validation";

@Controller("books")
@UseGuards(AuthGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  private readonly maxPageSize = 50;

  @Get()
  async list(
    @Query("page") pageQuery?: string,
    @Query("pageSize") pageSizeQuery?: string,
    @Query("search") search?: string
  ): Promise<BookListResponseDto> {
    const page = this.parseNumber(pageQuery, 1);
    const pageSize = this.parseNumber(pageSizeQuery, 10);
    const normalizedSearch = search?.trim() || undefined;

    if (page < 1 || pageSize < 1) {
      throw new BadRequestException({ message: "Invalid pagination" });
    }
    if (pageSize > this.maxPageSize) {
      throw new BadRequestException({ message: "Page size too large" });
    }

    return this.booksService.list({
      page,
      pageSize,
      search: normalizedSearch
    });
  }

  @Get(":id")
  async get(@Param("id") idParam: string): Promise<BookDto> {
    const id = this.parseNumber(idParam, 0);
    if (id < 1) {
      throw new BadRequestException({ message: "Invalid id" });
    }

    return this.booksService.getById(id);
  }

  @Post()
  async create(@Body() body: BookCreateDto): Promise<BookDto> {
    const errors: FieldErrors = {};
    requireString(body?.title, "title", errors);
    ensureValid(errors);

    return this.booksService.create({
      title: body.title.trim(),
      author: this.normalizeOptional(body.author)
    });
  }

  @Patch(":id")
  async update(
    @Param("id") idParam: string,
    @Body() body: BookUpdateDto
  ): Promise<BookDto> {
    const id = this.parseNumber(idParam, 0);
    if (id < 1) {
      throw new BadRequestException({ message: "Invalid id" });
    }

    const hasTitle = typeof body?.title === "string";
    const hasAuthor = typeof body?.author === "string";
    if (!hasTitle && !hasAuthor) {
      throw new BadRequestException({ message: "No fields to update" });
    }

    const errors: FieldErrors = {};
    if (hasTitle) {
      requireString(body.title, "title", errors);
    }
    ensureValid(errors);

    return this.booksService.update(id, {
      title: hasTitle ? body.title!.trim() : undefined,
      author: hasAuthor ? this.normalizeOptional(body.author) : undefined
    });
  }

  @Delete(":id")
  async remove(@Param("id") idParam: string): Promise<{ ok: true }> {
    const id = this.parseNumber(idParam, 0);
    if (id < 1) {
      throw new BadRequestException({ message: "Invalid id" });
    }

    await this.booksService.remove(id);
    return { ok: true };
  }

  private parseNumber(value: string | undefined, fallback: number): number {
    if (!value) {
      return fallback;
    }

    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  private normalizeOptional(value: string | null | undefined): string | null {
    if (value === null) {
      return null;
    }
    if (typeof value !== "string") {
      return null;
    }

    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  }
}
