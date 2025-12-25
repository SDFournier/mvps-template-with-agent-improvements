import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import {
  AuthLoginRequestDto,
  AuthLoginResponseDto,
  AuthLogoutResponseDto,
  AuthMeResponseDto,
  AuthRegisterRequestDto,
  AuthRegisterResponseDto
} from "@repo/shared";
import { AuthService } from "./auth.service";
import {
  ensureValid,
  FieldErrors,
  normalizeEmail,
  requireEmail,
  requireMinLength
} from "../common/validation";
import { AuthGuard } from "./auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(
    @Body() body: AuthRegisterRequestDto
  ): Promise<AuthRegisterResponseDto> {
    const errors: FieldErrors = {};
    requireEmail(body?.email, "email", errors);
    requireMinLength(body?.password, "password", 6, errors);
    ensureValid(errors);

    const email = normalizeEmail(body.email);
    const password = body.password.trim();
    const user = await this.authService.register(email, password);
    return { user: { id: user.id, email: user.email, role: user.role } };
  }

  @Post("login")
  async login(
    @Body() body: AuthLoginRequestDto
  ): Promise<AuthLoginResponseDto> {
    const errors: FieldErrors = {};
    requireEmail(body?.email, "email", errors);
    requireMinLength(body?.password, "password", 6, errors);
    ensureValid(errors);

    const email = normalizeEmail(body.email);
    const password = body.password.trim();
    const session = await this.authService.login(email, password);
    return {
      token: session.token,
      user: { id: session.user.id, email: session.user.email, role: session.user.role }
    };
  }

  @Post("logout")
  @UseGuards(AuthGuard)
  async logout(
    @Req() request: { authToken?: string }
  ): Promise<AuthLogoutResponseDto> {
    if (request.authToken) {
      await this.authService.logout(request.authToken);
    }
    return { ok: true };
  }

  @Get("me")
  @UseGuards(AuthGuard)
  async me(@Req() request: { user: { id: number; email: string; role: string } }): Promise<AuthMeResponseDto> {
    return {
      user: {
        id: request.user.id,
        email: request.user.email,
        role: request.user.role as "admin" | "user"
      }
    };
  }
}
