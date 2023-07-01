import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop } from 'src/schemas/shop.schema';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel(Shop.name) private readonly shopModel: Model<Shop>,
  ) {}

  async getAllShops(): Promise<Shop[]> {
    return this.shopModel.find().exec();
  }

  async getShopById(id: string): Promise<Shop> {
    return this.shopModel.findById(id).exec();
  }

  async createShop(createShopDto: Shop): Promise<Shop> {
    const createdShop = new this.shopModel(createShopDto);
    return createdShop.save();
  }

  async updateShop(id: string, updateShopDto: Shop): Promise<Shop> {
    return this.shopModel.findByIdAndUpdate(id, updateShopDto, { new: true }).exec();
  }

  async deleteShop(id: string): Promise<Shop> {
    return this.shopModel.findByIdAndRemove(id).exec();
  }
}
