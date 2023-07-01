import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Product } from './product.schema';

export type ShopDocument = HydratedDocument<Shop>;

@Schema()
export class Shop {
  @Prop()
  shop_name: string;

  @Prop()
  description: string;

  @Prop()
  location: string;

  @Prop()
  products: Product[];

}

export const ShopSchema = SchemaFactory.createForClass(Shop);
