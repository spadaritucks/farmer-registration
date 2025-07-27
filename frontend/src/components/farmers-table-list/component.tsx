"use client"
import { useRouter } from "next/navigation";
import Button from "../button/component";
import "./styles.css"
import { UserResponseDTO } from "@/DTOs/UserResponseDTO";

interface FarmersTableListProps {
    users: UserResponseDTO[]
}

export default function FarmersTableList({ users }: FarmersTableListProps) {

    const router = useRouter()

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
                                <Button name="Deletar" variant="destructive" />
                            </td>
                        </tr>
                    )) : <tr><td>Nenhum Agricultor Encontrado</td></tr>}

                </tbody>
            </table>
        </div>
    )
}