import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from 'src/schemas/order.schema';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('v1/orders')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() order: Order) {
    return this.orderService.create(order);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() order: Order) {
    return this.orderService.update(id, order);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
  
}
