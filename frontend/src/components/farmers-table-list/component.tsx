"use client"
import { useRouter } from "next/navigation";
import Button from "../button/component";
import "./styles.css"
import { UserResponseDTO } from "@/DTOs/UserResponseDTO";
import { useModal } from "@/context/modal";
import { toast } from "sonner";
import { UsersService } from "@/services/UsersService";

interface FarmersTableListProps {
    users: UserResponseDTO[]
}

export default function FarmersTableList({ users }: FarmersTableListProps) {

    const router = useRouter()
    const {openModal, hideModal} = useModal()

    function HandleConfirmDelete (_id : string) {
        openModal("Deseja deletar esse usuario?", 
            <div style={{display : "flex", gap : "10px", width : "100%" }}>
                <Button name="Sim" variant="destructive" onClick={() => DeleteUser(_id) }/>
                <Button name="Não" variant="default" onClick={() => hideModal() }/>
            </div>
        )
    }

    async function DeleteUser (_id : string) {
        try{

            await UsersService.delete(_id)
            toast.success("Usuario Deletado com Sucesso")

        }catch(error: any){
            toast.error(error.message)
        }
    }

    return (
        <div className="list-container">
            <div className="actions">
                <Button name="Cadastrar Agricultor" variant="success" onClick={() => router.push("/register")} />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nome Completo</th>
                        <th>CPF</th>
                        <th>Data de Nascimento</th>
                        <th>Telefone</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length > 0 ? users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.fullName}</td>
                            <td>{user.cpf}</td>
                            <td>{user.birthDate ? new Date(user.birthDate).toLocaleDateString("pt-br") : "Não Consta"}</td>
                            <td>{user.phone ? user.phone : "Não Consta"}</td>
                            <td>{user.active}</td>
                            <td className="table-actions">
                                <Button name="Editar" variant="default" onClick={() => router.push(`/update?id=${user._id}`)} />
                                <Button name="Deletar" variant="destructive" onClick={() => HandleConfirmDelete(user._id)}   />
                            </td>
                        </tr>
                    )) : <tr><td>Nenhum Agricultor Encontrado</td></tr>}

                </tbody>
            </table>
        </div>
    )
}