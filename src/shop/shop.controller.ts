import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ShopService } from './shop.service';
import { Shop } from 'src/schemas/shop.schema';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('v1/shops')
@UseGuards(AuthGuard)
export class ShopController {
    constructor(private readonly shopService: ShopService) {}
    @Get()
    getAllShops(): Promise<Shop[]> {
      return this.shopService.getAllShops();
    }

    @Get(':id')
    getShopById(@Param('id') id: string): Promise<Shop> {
      return this.shopService.getShopById(id);
    }

    @Post()
    createShop(@Body() createShopDto: Shop): Promise<Shop> {
      return this.shopService.createShop(createShopDto);
    }

    @Put(':id')
    updateShop(@Param('id') id: string, @Body() updateShopDto: Shop): Promise<Shop> {
      return this.shopService.updateShop(id, updateShopDto);
    }

    @Delete(':id')
    deleteShop(@Param('id') id: string): Promise<Shop> {
      return this.shopService.deleteShop(id);
    }
}
