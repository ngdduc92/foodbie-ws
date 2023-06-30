import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Order, OrderSchema } from 'src/schemas/order.schema';
import { Product, ProductSchema } from 'src/schemas/product.schema';
import { ProductOptions, ProductOptionsSchema } from 'src/schemas/products-options.schema';
import { Shop, ShopSchema } from 'src/schemas/shop.schema';
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
      {
        name: Shop.name,
        schema: ShopSchema,
      },
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: ProductOptions.name,
        schema: ProductOptionsSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [MongooseModule],
})
export class SharedModule {}
