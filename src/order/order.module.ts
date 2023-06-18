import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/schemas/order.schema';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { Token, TokenSchema } from 'src/schemas/token.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    SharedModule,
    AuthModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
