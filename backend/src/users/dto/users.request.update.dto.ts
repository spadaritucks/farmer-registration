import { IsDate, IsOptional, IsDateString, IsString, Length, Matches } from "class-validator"

export class UsersRequestUpdateDTO {

    
    @IsString()
    @Length(8, 60)
    fullName: string


    @IsOptional()
    @IsDateString({}, { message: "Data de nascimento inválida. Use o formato YYYY-MM-DD." })
    birthDate: string;

    @IsString()
    @Matches(/^\(?\d{2}\)?\s?\d{5}-\d{4}$/, {
        message : "Telefone inválido. Use o formato (99) 99999-9999"
    })
    phone: string


    
}