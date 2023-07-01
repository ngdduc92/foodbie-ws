import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<ProductDocument>,
  ) {}

  async create(product: Product): Promise<Product> {
    const createdProduct = new this.ProductModel(product);
    return createdProduct.save();
  }

  async findOne(id: string): Promise<Product | null> {
    return this.ProductModel.findById(id).exec();
  }

  async findAll(): Promise<Product[]> {
    return this.ProductModel.find().exec();
  }

  async update(id: string, product: Product): Promise<Product | null> {
    return this.ProductModel.findByIdAndUpdate(id, product, { new: true }).exec();
  }

  async remove(id: string): Promise<Product | null> {
    return this.ProductModel.findByIdAndDelete(id).exec();
  }
}
