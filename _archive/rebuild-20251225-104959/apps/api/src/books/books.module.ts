import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { CacheModule } from "../cache/cache.module";
import { Book } from "./book.entity";
import { BooksController } from "./books.controller";
import { BooksService } from "./books.service";

@Module({
  imports: [TypeOrmModule.forFeature([Book]), AuthModule, CacheModule],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
