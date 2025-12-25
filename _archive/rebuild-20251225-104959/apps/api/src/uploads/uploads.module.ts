import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Upload } from "./upload.entity";
import { AuthModule } from "../auth/auth.module";
import { UploadsController } from "./uploads.controller";
import { UploadsService } from "./uploads.service";

@Module({
  imports: [TypeOrmModule.forFeature([Upload]), AuthModule],
  controllers: [UploadsController],
  providers: [UploadsService]
})
export class UploadsModule {}
