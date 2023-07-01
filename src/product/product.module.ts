import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { SharedModule } from 'src/shared/shared.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [SharedModule, AuthModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {

}
