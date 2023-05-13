import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    UseGuards,
    Request,
    UnauthorizedException,
  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private userService: UserService, private jwtService: JwtService) {}
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
      return this.authService.signIn(signInDto.email, signInDto.password);
    }
    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
      const userProfile = await this.userService.findByUserId(req.user.sub)
      return userProfile;
    }
    @Get('refresh')
    async refresh(@Request() req) {
      const accessToken = this.authService.extractTokenFromHeader(req);
      if (!accessToken) {
        throw new UnauthorizedException();
      }
      const decodedJwtAccessToken: any = this.jwtService.decode(accessToken);
      const refreshToken = await this.authService.getRefreshToken(decodedJwtAccessToken.sub);
      try {
        const payload = await this.authService.verifyToken(refreshToken, jwtConstants.refresh_secret);
        if (payload) {
          return this.authService.genAccessToken({userId: decodedJwtAccessToken.sub, email: decodedJwtAccessToken.email});
        } else {
          throw new UnauthorizedException();
        }
      } catch {
        throw new UnauthorizedException();
      }  
    }

    @Get('logout')
    logout(@Request() req) {
      const accessToken = this.authService.extractTokenFromHeader(req);
      if (!accessToken) {
        throw new UnauthorizedException();
      }
      const decodedJwtAccessToken: any = this.jwtService.decode(accessToken);
      return this.authService.deleteRefreshToken(decodedJwtAccessToken?.sub);
    }
}
  
