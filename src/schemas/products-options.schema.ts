import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductOptionsDocument = HydratedDocument<ProductOptions>;

@Schema()
export class ProductOptions {
  @Prop()
  option_name: string;

  @Prop()
  description: string;

  @Prop()
  extra_price: number;

  @Prop()
  group_name: string;

  @Prop()
  is_multi_choice: boolean;
}

export const ProductOptionsSchema =
  SchemaFactory.createForClass(ProductOptions);
