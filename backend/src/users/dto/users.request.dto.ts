import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UsersRequestDTO {
  @ApiProperty({
    example: 'Thiago Henrique Spadari de Oliveira',
    description: 'Nome completo do usuário',
    minLength: 8,
    maxLength: 60,
  })
  @IsNotEmpty({ message: 'O nome completo do usuário é obrigatório!' })
  @IsString()
  @Length(8, 60)
  fullName: string;

  @ApiProperty({
    example: '123.456.789-00',
    description: 'CPF do usuário no formato 000.000.000-00',
  })
  @IsNotEmpty({ message: 'O CPF é obrigatório!' })
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'CPF inválido! Use o formato 000.000.000-00',
  })
  cpf: string;

  @ApiPropertyOptional({
    example: '2000-05-15',
    description: 'Data de nascimento do usuário no formato YYYY-MM-DD',
  })
  @IsOptional()
  @IsDateString({}, {
    message: 'Data de nascimento inválida. Use o formato YYYY-MM-DD.',
  })
  birthDate: string;

  @ApiPropertyOptional({
    example: '(11) 91234-5678',
    description: 'Telefone do usuário no formato (99) 99999-9999',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\(?\d{2}\)?\s?\d{5}-\d{4}$/, {
    message: 'Telefone inválido. Use o formato (99) 99999-9999',
  })
  phone: string;

  @ApiProperty({
    example: true,
    description: 'Status do usuário: ativo (true) ou inativo (false)',
  })
  @IsBoolean({ message: "O campo 'active' deve ser verdadeiro ou falso." })
  active: boolean;
}
