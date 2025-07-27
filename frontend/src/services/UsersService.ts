import { UserRequestDTO } from "@/DTOs/UserRequestDTO";

export class UsersService {
    
    static async create(userRequestDTO : UserRequestDTO) {
        const response = await fetch("http://localhost:8000/users", {
            headers : {
                "Content-Type" : "application/json"
            },
            method : "POST",
            body : JSON.stringify(userRequestDTO)
        })

        if(!response.ok){
            throw new Error("Erro no Servidor")
        }

        const data = await response.json()
        
        return data
    }
}