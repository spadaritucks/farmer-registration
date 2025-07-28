import {
    IsDateString,
    IsOptional,
    IsString,
    Length,
    Matches,
    IsBoolean,
  } from 'class-validator';
  import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
  
  export class UsersRequestUpdateDTO {
    @ApiProperty({
      example: 'Thiago Henrique Spadari de Oliveira',
      description: 'Nome completo do usuário',
      minLength: 8,
      maxLength: 60,
    })
    @IsString()
    @Length(8, 60)
    fullName: string;
  
    @ApiPropertyOptional({
      example: '2000-05-15',
      description: 'Data de nascimento no formato YYYY-MM-DD',
    })
    @IsOptional()
    @IsDateString({}, {
      message: 'Data de nascimento inválida. Use o formato YYYY-MM-DD.',
    })
    birthDate: string;
  
    @ApiProperty({
      example: '(11) 91234-5678',
      description: 'Telefone do usuário no formato (99) 99999-9999',
    })
    @IsOptional()
    @IsString()
    phone: string;
  
    @ApiProperty({
      example: true,
      description: 'Status do usuário: ativo (true) ou inativo (false)',
    })
    @IsBoolean({ message: "O campo 'active' deve ser verdadeiro ou falso." })
    active: boolean;
  }
  