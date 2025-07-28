import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam, ApiBody, ApiNotFoundResponse, ApiConflictResponse, ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UsersRequestDTO } from './dto/users.request.dto';
import { UsersRequestUpdateDTO } from './dto/users.request.update.dto';
import { UsersResponseDTO } from './dto/users.response.dto';

@ApiTags('Users') 
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiBody({ type: UsersRequestDTO })
  @ApiCreatedResponse({type : UsersResponseDTO})
  @ApiConflictResponse({description : "O Usuario já existe!"})
  @ApiBadRequestResponse({description : "O Nome completo é obrigatório"})
  create(@Body() UsersRequestDTO: UsersRequestDTO) {
    return this.usersService.create(UsersRequestDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários com filtros opcionais' })
  @ApiQuery({ name: 'fullName', required: false })
  @ApiQuery({ name: 'cpf', required: false })
  @ApiQuery({ name: 'active', required: false })
  findAll(
    @Query('fullName') fullName?: string,
    @Query('active') active?: string,
    @Query('cpf') cpf?: string,
  ) {
    return this.usersService.findAll(fullName, active, cpf);
  }


  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um usuário' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UsersRequestUpdateDTO })
  @ApiOkResponse({type : UsersResponseDTO})
  @ApiNotFoundResponse({description : "Usuario não Existe"})
  update(
    @Param('id') id: string,
    @Body() usersRequestUpdateDTO: UsersRequestUpdateDTO,
  ) {
    return this.usersService.update(id, usersRequestUpdateDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um usuário' })
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({type : UsersResponseDTO})
  @ApiNotFoundResponse({description : "Usuario não Existe"})
  @ApiBadRequestResponse({description : "Não é possivel excluir usuarios ativos!"})
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
