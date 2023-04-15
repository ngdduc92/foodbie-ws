import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, ObjectId, Types } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  create() {
    return 'This action adds a new user';
  }
  findAll() {
    return `This action returns all user`;
  }

  async findByUserId(userId: string){
    const user = await this.userModel.findOne({userId}).exec()
    return user
  }

  async findByEmail(email: string){
    const user = await this.userModel.findOne({email}).exec()
    return user
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
