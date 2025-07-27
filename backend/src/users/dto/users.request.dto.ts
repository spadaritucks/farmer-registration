import {
    IsBoolean,
    IsDateString,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
    Matches,
  } from "class-validator";
  
  export class UsersRequestDTO {
    @IsNotEmpty({ message: "O nome completo do usuário é obrigatório!" })
    @IsString()
    @Length(8, 60)
    fullName: string;
  
    @IsNotEmpty({ message: "O CPF é obrigatório!" })
    @Matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, {
      message: "CPF inválido! Use o formato 000.000.000-00",
    })
    cpf: string;
  
    @IsOptional()
    @IsDateString({}, { message: "Data de nascimento inválida. Use o formato YYYY-MM-DD." })
    birthDate: string;
  
    @IsOptional()
    @IsString()
    @Matches(/^\(?\d{2}\)?\s?\d{5}-\d{4}$/, {
      message: "Telefone inválido. Use o formato (99) 99999-9999",
    })
    phone: string;
  
    @IsBoolean({ message: "O campo 'active' deve ser verdadeiro ou falso." })
    active: boolean;
  }
  