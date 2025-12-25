import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { extractBearerToken } from "./auth-token";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const header = request?.headers?.authorization;
    const token = extractBearerToken(header);

    if (!token) {
      throw new UnauthorizedException({ message: "Missing token" });
    }

    const user = await this.authService.validateSession(token);
    if (!user) {
      throw new UnauthorizedException({ message: "Invalid token" });
    }

    request.user = user;
    request.authToken = token;
    return true;
  }
}
