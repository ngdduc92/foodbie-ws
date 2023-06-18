import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from 'src/schemas/token.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { UserModule } from 'src/user/user.module';
import { SharedModule } from 'src/shared/shared.module';
@Module({
  imports: [
    SharedModule,
    JwtModule,
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
