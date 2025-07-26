import { IsDate, IsString, Length, Matches } from "class-validator"

export class UsersRequestUpdateDTO {

    
    @IsString()
    @Length(8, 60)
    fullName: string


    @IsDate()
    birthDate: Date

    @IsString()
    @Matches(/^\(?\d{2}\)?\s?\d{5}-\d{4}$/, {
        message : "Telefone inválido. Use o formato (99) 99999-9999"
    })
    phone: string


    
}