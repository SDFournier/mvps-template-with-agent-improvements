import {
  ConflictException,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { randomBytes, createHmac, timingSafeEqual } from "crypto";
import { User } from "./user.entity";
import { Session } from "./session.entity";

const DEFAULT_SESSION_DAYS = 7;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Session)
    private readonly sessions: Repository<Session>
  ) {}

  async register(email: string, password: string): Promise<User> {
    const existing = await this.users.findOne({ where: { email } });
    if (existing) {
      throw new ConflictException({ message: "Email already registered" });
    }

    const { hash, salt } = this.hashPassword(password);
    const role = this.resolveRole(email);
    const user = this.users.create({
      email,
      passwordHash: hash,
      passwordSalt: salt,
      role
    });
    return this.users.save(user);
  }

  async login(email: string, password: string): Promise<Session> {
    const user = await this.users.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException({ message: "Invalid credentials" });
    }

    if (!this.verifyPassword(password, user.passwordHash, user.passwordSalt)) {
      throw new UnauthorizedException({ message: "Invalid credentials" });
    }

    return this.createSession(user);
  }

  async validateSession(token: string): Promise<User | null> {
    const session = await this.sessions.findOne({ where: { token } });
    if (!session) {
      return null;
    }

    if (session.expiresAt.getTime() <= Date.now()) {
      await this.sessions.delete({ id: session.id });
      return null;
    }

    return session.user;
  }

  async logout(token: string): Promise<void> {
    await this.sessions.delete({ token });
  }

  private createSession(user: User): Promise<Session> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + this.getSessionDays());

    const session = this.sessions.create({
      user,
      token: randomBytes(32).toString("hex"),
      expiresAt
    });

    return this.sessions.save(session);
  }

  private getSessionDays(): number {
    const raw = Number(process.env.SESSION_DAYS);
    if (Number.isFinite(raw) && raw > 0) {
      return raw;
    }
    return DEFAULT_SESSION_DAYS;
  }

  private resolveRole(email: string): "admin" | "user" {
    const list = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean);

    if (list.includes(email.toLowerCase())) {
      return "admin";
    }

    return "user";
  }

  private hashPassword(password: string): { hash: string; salt: string } {
    const salt = randomBytes(16).toString("hex");
    const hash = createHmac("sha256", salt).update(password).digest("hex");
    return { hash, salt };
  }

  private verifyPassword(password: string, hash: string, salt: string): boolean {
    const computed = createHmac("sha256", salt).update(password).digest("hex");
    const a = Buffer.from(computed);
    const b = Buffer.from(hash);
    return a.length === b.length && timingSafeEqual(a, b);
  }
}
