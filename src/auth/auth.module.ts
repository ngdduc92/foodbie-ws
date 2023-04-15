import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from 'src/schemas/token.schema';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
  UserModule,
  JwtModule,
  MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
