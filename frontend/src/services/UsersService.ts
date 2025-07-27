import { UserRequestDTO } from "@/DTOs/UserRequestDTO";
import { UserRequestUpdateDTO } from "@/DTOs/UserRequestUpdateDTO";
import { UserResponseDTO } from "@/DTOs/UserResponseDTO";

export class UsersService {


    static async getAll() : Promise<UserResponseDTO[]>{
        const response = await fetch("http://localhost:8000/users", {
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
        const response = await fetch("http://localhost:8000/users", {
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
        const response = await fetch(`http://localhost:8000/users/${id}`, {
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
}