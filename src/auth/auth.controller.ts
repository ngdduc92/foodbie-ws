import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { JwtSecrets } from '../enums/jwt-secrets';

@Controller('v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get('refresh')
  async refresh(@Request() req) {
    const accessToken = this.authService.extractTokenFromHeader(req);
    if (!accessToken) {
      throw new UnauthorizedException();
    }
    const decodedJwtAccessToken: any = this.jwtService.decode(accessToken);
    const refreshToken = await this.authService.getRefreshToken(
      decodedJwtAccessToken.sub,
    );
    try {
      const payload = await this.authService.verifyToken(
        refreshToken,
        JwtSecrets.REFRESH_SECRET,
      );
      if (payload) {
        return this.authService.genAccessToken({
          userId: decodedJwtAccessToken.sub,
          email: decodedJwtAccessToken.email,
        });
      } else {
        await this.authService.deleteRefreshToken(decodedJwtAccessToken?.sub);
        throw new UnauthorizedException();
      }
    } catch {
      await this.authService.deleteRefreshToken(decodedJwtAccessToken?.sub);
      throw new UnauthorizedException();
    }
  }

  @Get('logout')
  @UseGuards(AuthGuard)
  logout(@Request() req) {
    const accessToken = this.authService.extractTokenFromHeader(req);
    if (!accessToken) {
      throw new UnauthorizedException();
    }
    const decodedJwtAccessToken: any = this.jwtService.decode(accessToken);
    return this.authService.deleteRefreshToken(decodedJwtAccessToken?.sub);
  }
}
