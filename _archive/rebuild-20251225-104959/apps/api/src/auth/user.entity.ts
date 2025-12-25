import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserRole } from "@repo/shared";

@Entity({ name: "users" })
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  passwordHash!: string;

  @Column()
  passwordSalt!: string;

  @Column({ type: "varchar", default: "user" })
  role!: UserRole;

  @CreateDateColumn()
  createdAt!: Date;
}
