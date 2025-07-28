import { UserRequestDTO } from "@/DTOs/UserRequestDTO";
import { UserRequestUpdateDTO } from "@/DTOs/UserRequestUpdateDTO";
import { UserResponseDTO } from "@/DTOs/UserResponseDTO";

export class UsersService {

    static async getAll() : Promise<UserResponseDTO[]>{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
            headers: {
                "Content-Type": "application/json"
            },
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message)
        }


        return data
    }



    static async getUsersByQueryString(fullName? : string, cpf? : string, active?: string) : Promise<UserResponseDTO[]>{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/by-query?fullName=${fullName}&cpf=${cpf}&active=${active}`, {
            headers: {
                "Content-Type": "application/json"
            },
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message)
        }


        return data
    }

    static async create(userRequestDTO: UserRequestDTO) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(userRequestDTO)
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message)
        }


        return data
    }

    static async update(id: string | null, userRequestUpdateDTO: UserRequestUpdateDTO) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PATCH",
            body: JSON.stringify(userRequestUpdateDTO)
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message)
        }


        return data
    }

    static async delete(id: string | null) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "DELETE",

        })
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message)
        }


        return data
    }


}