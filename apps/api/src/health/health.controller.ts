import { Controller, Get } from "@nestjs/common";
import { HealthResponseDto } from "@repo/shared";
import { HealthService } from "./health.service";

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get("health")
  async health(): Promise<HealthResponseDto> {
    return this.healthService.check();
  }
}