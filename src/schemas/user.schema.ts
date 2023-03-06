import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  fullname: string;

  @Prop()
  address: string;

  @Prop()
  is_active: boolean;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop()
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
