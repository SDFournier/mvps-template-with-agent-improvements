import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "uploads" })
export class Upload {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  originalName!: string;

  @Column()
  storedName!: string;

  @Column()
  mimeType!: string;

  @Column()
  size!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
