import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../auth/user.entity";

@Injectable()
export class AdminService {
  constructor(@InjectRepository(User) private readonly users: Repository<User>) {}

  async getOverview() {
    const userCount = await this.users.count();
    return {
      userCount,
      message: "Admin overview"
    };
  }
}
