import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Book } from "./book.entity";
import { CacheService } from "../cache/cache.service";

type ListOptions = {
  page: number;
  pageSize: number;
  search?: string;
};

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly books: Repository<Book>,
    private readonly cache: CacheService
  ) {}

  async list({ page, pageSize, search }: ListOptions) {
    const cacheKey = this.buildCacheKey(page, pageSize, search);
    const cached = await this.cache.getJson<{
      items: Book[];
      pagination: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
      };
    }>(cacheKey);
    if (cached) {
      return cached;
    }

    const where = search
      ? [{ title: Like(`%${search}%`) }, { author: Like(`%${search}%`) }]
      : undefined;

    const [items, total] = await this.books.findAndCount({
      where,
      order: { id: "DESC" },
      skip: (page - 1) * pageSize,
      take: pageSize
    });

    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const response = {
      items,
      pagination: {
        page,
        pageSize,
        total,
        totalPages
      }
    };

    await this.cache.setJson(cacheKey, response, this.getCacheTtlSeconds());
    return response;
  }

  async getById(id: number): Promise<Book> {
    const book = await this.books.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException({ message: "Book not found" });
    }

    return book;
  }

  async create(data: Partial<Book>): Promise<Book> {
    const book = this.books.create(data);
    const saved = await this.books.save(book);
    await this.cache.deleteByPrefix(this.cachePrefix());
    return saved;
  }

  async update(id: number, data: Partial<Book>): Promise<Book> {
    const book = await this.getById(id);
    Object.assign(book, data);
    const saved = await this.books.save(book);
    await this.cache.deleteByPrefix(this.cachePrefix());
    return saved;
  }

  async remove(id: number): Promise<void> {
    const book = await this.getById(id);
    await this.books.remove(book);
    await this.cache.deleteByPrefix(this.cachePrefix());
  }

  private cachePrefix(): string {
    return "books:list:";
  }

  private buildCacheKey(page: number, pageSize: number, search?: string): string {
    const normalizedSearch = search?.toLowerCase() ?? "";
    return `${this.cachePrefix()}${page}:${pageSize}:${normalizedSearch}`;
  }

  private getCacheTtlSeconds(): number {
    const raw = Number(process.env.CACHE_TTL_SECONDS);
    if (Number.isFinite(raw) && raw > 0) {
      return raw;
    }
    return 30;
  }
}
