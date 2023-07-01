import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductOptionDocument = HydratedDocument<ProductOption>;

@Schema()
export class ProductOption {
  @Prop()
  option_name: string;

  @Prop()
  descriptions: string;

  @Prop()
  extra_price: number;

  @Prop()
  group_name: string;

  @Prop()
  is_multi_choice: boolean;
}

export const ProductOptionSchema = SchemaFactory.createForClass(ProductOption);
