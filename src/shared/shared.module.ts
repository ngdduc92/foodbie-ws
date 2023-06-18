import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Order, OrderSchema } from 'src/schemas/order.schema';
import { Token, TokenSchema } from 'src/schemas/token.schema';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Token.name,
        schema: TokenSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [MongooseModule],
})
export class SharedModule {}
