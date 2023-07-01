import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ProductOption } from './product-option.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  product_name: string;

  @Prop()
  descriptions: string;

  @Prop()
  images: string;

  @Prop()
  base_price: number;

  @Prop()
  rating: number;

  @Prop()
  comment: string[];

  @Prop()
  products_options:ProductOption[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
