import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProductService } from './product.service';
import { Product } from 'src/schemas/product.schema';

@Controller('v1/products')
@UseGuards(AuthGuard)

export class ProductController {
  constructor(private readonly productService: ProductService) {}

    @Get(':id')
    getProductById(@Param('id') id: string): Promise<Product> {
      return this.productService.findOne(id);
    }

    @Post()
    createProduct(@Body() createProductDto: Product): Promise<Product> {
      return this.productService.create(createProductDto);
    }
  
    @Put(':id')
    updateProduct(@Param('id') id: string, @Body() updateProductDto: Product): Promise<Product> {
      return this.productService.update(id, updateProductDto);
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: string): Promise<Product> {
      return this.productService.remove(id);
    }
}
