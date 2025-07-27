import { UserRequestDTO } from "@/DTOs/UserRequestDTO";

export class UsersService {
    
    static async create(userRequestDTO : UserRequestDTO) {
        const response = await fetch("http://localhost:8000/users", {
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(userRequestDTO)
        })

        if(response.ok){
            throw new Error("Erro no Servidor")
        }
        
        return await response.json()
    }
}