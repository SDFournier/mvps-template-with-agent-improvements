import { Controller, Get, UseGuards } from "@nestjs/common";
import { AdminOverviewDto } from "@repo/shared";
import { AuthGuard } from "../auth/auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { AdminService } from "./admin.service";

@Controller("admin")
@UseGuards(AuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("overview")
  @Roles("admin")
  async overview(): Promise<AdminOverviewDto> {
    return this.adminService.getOverview();
  }
}
