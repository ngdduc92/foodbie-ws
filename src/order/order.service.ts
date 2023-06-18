import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from 'src/schemas/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private OrderModel: Model<OrderDocument>,
  ) {}

  async create(order: Order): Promise<Order> {
    const createdOrder = new this.OrderModel(order);
    return createdOrder.save();
  }

  async findOne(id: string): Promise<Order | null> {
    return this.OrderModel.findById(id).exec();
  }

  async findAll(): Promise<Order[]> {
    return this.OrderModel.find().exec();
  }

  async update(id: string, order: Order): Promise<Order | null> {
    return this.OrderModel.findByIdAndUpdate(id, order, { new: true }).exec();
  }

  async remove(id: string): Promise<Order | null> {
    return this.OrderModel.findByIdAndDelete(id).exec();
  }

}
