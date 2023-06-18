import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { SharedModule } from 'src/shared/shared.module';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [SharedModule, JwtModule, forwardRef(() => UserModule)],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
