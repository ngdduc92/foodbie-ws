import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop()
  shopId: number;

  @Prop()
  shopName: string;

  @Prop()
  products: Object[];

  @Prop()
  orderDate: Date;

  @Prop()
  subTotal: number;

  @Prop()
  promotionCode: number;

  @Prop()
  total: number;

  @Prop()
  note: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
