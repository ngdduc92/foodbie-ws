import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ProductOptions } from './products-options.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  product_name: string;

  @Prop()
  description: string;

  @Prop()
  images: string;

  @Prop()
  base_price: number;

  @Prop()
  rating: number;

  @Prop()
  comment: string[];

  @Prop()
  products_options: ProductOptions[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
