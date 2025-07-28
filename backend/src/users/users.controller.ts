import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRequestDTO } from './dto/users.request.dto';
import { UsersRequestUpdateDTO } from './dto/users.request.update.dto';
import { cp } from 'fs';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() UsersRequestDTO: UsersRequestDTO) {
    return this.usersService.create(UsersRequestDTO);
  }

  @Get()
  findAll(
    @Query("fullName") fullName?: string,
    @Query("active") active?: string,
    @Query("cpf") cpf?: string
  ) {
    return this.usersService.findAll(fullName, active, cpf);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() usersRequestUpdateDTO: UsersRequestUpdateDTO) {
    return this.usersService.update(id, usersRequestUpdateDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
