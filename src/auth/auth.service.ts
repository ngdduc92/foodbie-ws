import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from 'src/schemas/token.schema';
import { Model } from 'mongoose';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class AuthService {
    constructor(
      @InjectModel(Token.name) private TokenModel: Model<Token>,
      private usersService: UserService,
      private jwtService: JwtService,
    ) {}
    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user?.password !== pass) {
          throw new UnauthorizedException();
        }
        // const payload = { email: user.email, sub: user.userId };
        const [accessToken, refreshToken] = await Promise.all([
          this.genAccessToken(user),
          this.jwtService.signAsync(
            {
              sub: user.userId,
              email: user.email
            },
            {
              secret: jwtConstants.refresh_secret,
              expiresIn: '30s',
            },
          ),
        ]);
        this.genRefreshToken( user.userId ,refreshToken)
        return {
          accessToken
        };
    }
    async genRefreshToken(userId: number, token: string): Promise<any> {
      const createdToken = new this.TokenModel({userId, token});
      return createdToken.save();
    }

    async getRefreshToken(userId: number) {
      const tokenUser = await this.TokenModel.find({userId}).exec()
      return tokenUser[0].token;
    }

    genAccessToken(user: any) {
      return this.jwtService.signAsync(
        {
          sub: user.userId,
          email: user.email
        },
        {
          secret: jwtConstants.access_secret,
          expiresIn: '15s',
        },
      )
    }

    verifyToken(token: string, secret: string) {
      return this.jwtService.verifyAsync(
        token,
        {
          secret
        }
      )
    }

    extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }

    deleteRefreshToken(userId: number) {
      return this.TokenModel.findOne({ userId }).remove().exec();
    }
}
