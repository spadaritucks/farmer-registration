import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRequestDTO } from './dto/users.request.dto';
import { UsersRequestUpdateDTO } from './dto/users.request.update.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() UsersRequestDTO: UsersRequestDTO) {
    return this.usersService.create(UsersRequestDTO);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() usersRequestUpdateDTO: UsersRequestUpdateDTO) {
    return this.usersService.update(+id, usersRequestUpdateDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
