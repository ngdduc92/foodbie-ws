import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.authService.extractTokenFromHeader(request);
        if (!token) {
          throw new UnauthorizedException();
        }
        try {
          const payload = await this.authService.verifyToken(token, jwtConstants.access_secret);
          request['user'] = payload;
        } catch {
          throw new UnauthorizedException();
        }
        return true;
      }
   
}