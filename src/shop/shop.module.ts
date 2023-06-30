import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { SharedModule } from 'src/shared/shared.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [SharedModule, AuthModule],
  providers: [ShopService],
  controllers: [ShopController]
})
export class ShopModule {}
