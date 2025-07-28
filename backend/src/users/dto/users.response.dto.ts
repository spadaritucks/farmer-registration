
import { ApiProperty } from '@nestjs/swagger';

export class UsersResponseDTO {
  
  @ApiProperty({
    example: '64f11cb5e4b1a3a9c0f9c123',
    description: 'Identificador único do usuário (MongoDB _id)',
  })
  _id: string;

  @ApiProperty({
    example: 'Thiago Henrique Spadari de Oliveira',
    description: 'Nome completo do usuário',
  })
  fullName: string;

  @ApiProperty({
    example: '123.456.789-00',
    description: 'CPF do usuário',
  })
  cpf: string;

  @ApiProperty({
    example: '2000-05-15T00:00:00.000Z',
    description: 'Data de nascimento do usuário',
  })
  birthDate: Date;

  @ApiProperty({
    example: '(11) 91234-5678',
    description: 'Telefone do usuário',
  })
  phone: string;

  @ApiProperty({
    example: true,
    description: 'Status do usuário: ativo (true) ou inativo (false)',
  })
  active: boolean;

  @ApiProperty({
    example: '2025-07-27T22:15:00.000Z',
    description: 'Data de criação do registro',
  })
  created_at: string;

  @ApiProperty({
    example: '2025-07-28T10:30:00.000Z',
    description: 'Data da última atualização do registro',
  })
  updated_at: string;
}

