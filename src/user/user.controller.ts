import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ObjectId, ObjectIdExpression } from 'mongoose';
import { UserService } from './user.service';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: object) {
    return this.userService.create();
  }

  @Get('')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: object) {
    return this.userService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
