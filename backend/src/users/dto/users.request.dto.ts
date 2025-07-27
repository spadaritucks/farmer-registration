import { IsBoolean, isBoolean, IsDate, IsNotEmpty, IsOptional, IsString, Length, Matches, Min } from "class-validator"

export class UsersRequestDTO {


    @IsNotEmpty({ message: "O nome completo do usuario é obrigátorio!" })
    @IsString()
    @Length(8, 60)
    fullName: string

    @IsNotEmpty({ message: "O CPF é obrigátorio!" })
    @Matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, {
        message: "CPF Invalido!"
    })
    cpf: string

    @IsOptional()
    @IsString()
    birthDate: string


    @IsOptional()
    @IsString()
    @Matches(/^\(?\d{2}\)?\s?\d{5}-\d{4}$/, {
        message : "Telefone inválido. Use o formato (99) 99999-9999"
    })
    phone: string

    @IsBoolean()
    active: boolean


}