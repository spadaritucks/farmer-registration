"use client"
import { useRouter, useSearchParams } from "next/navigation";
import Button from "../button/component";
import "./styles.css"
import { UserResponseDTO } from "@/DTOs/UserResponseDTO";
import { useModal } from "@/context/modal";
import { toast } from "sonner";
import { UsersService } from "@/services/UsersService";
import Input from "../input/component";
import { useNumericInput } from "@/utils/useNumericInput";
import { useCPF } from "@/utils/useCPF";
import Select from "../select/component";
import { useState } from "react";

interface FarmersTableListProps {
    users: UserResponseDTO[]
}

export default function FarmersTableList({ users }: FarmersTableListProps) {

    const router = useRouter()
    const { openModal, hideModal } = useModal()
    const { cpf, handleChange } = useCPF()
    const [fullName, setFullName] = useState<string | null>(null)
    const [active, setActive] = useState<string | null>(null)

    const searchParams = useSearchParams()

    function setFilters () {
        const params = new URLSearchParams(searchParams.toString())
        fullName && params.set("fullName", fullName)
        cpf && params.set("cpf", cpf)
        active && params.set("active", active)
      
        router.push("?" + params.toString());
    }

    function clearFilters (){
        const params = new URLSearchParams(searchParams.toString())
        params.delete("fullName")
        params.delete("cpf")
        params.delete("active")
        router.push("?" + params.toString());
       
    }

    function HandleConfirmDelete(_id: string) {
        openModal("Deseja deletar esse usuario?",
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                <Button name="Sim" variant="destructive" onClick={() => DeleteUser(_id)} />
                <Button name="Não" variant="default" onClick={() => hideModal()} />
            </div>
        )
    }

    async function DeleteUser(_id: string) {
        try {
            await UsersService.delete(_id)
            toast.success("Usuario Deletado com Sucesso")
            hideModal()

        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <div className="list-container">
            <div className="actions">
                <div className="filters">
                    <span>Filtrar por</span>
                    <Input
                        type="text"
                        placeholder="Nome Completo"
                        onChange={(e) => setFullName(e.target.value)}

                    />
                    <Input
                        type="text"
                        placeholder="CPF"
                        value={cpf}
                        onInput={useNumericInput}
                        onChange={handleChange}
                    />
                    <Select
                      onChange={(e) => setActive(e.target.value)}
                      defaultValue={"Selecione o Status"}
                    >
                        <option value="Selecione o Status" disabled>Selecione o Status</option>
                        <option value="true">Ativo</option>
                        <option value="false">Inativo</option>
                    </Select>
                    <Button name="Filtrar" variant="default" onClick={() => setFilters()} />
                    <Button name="Limpar" variant="destructive" onClick={() => clearFilters()} />
                </div>
                <Button name="Cadastrar" variant="success" onClick={() => router.push("/register")} />
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
                            <td>{user.active === true ? "Ativo" : "Inativo"}</td>
                            <td className="table-actions">
                                <Button name="Editar" variant="default" onClick={() => router.push(`/update?id=${user._id}`)} />
                                <Button name="Deletar" variant="destructive" onClick={() => HandleConfirmDelete(user._id)} />
                            </td>
                        </tr>
                    )) : <tr><td>Nenhum Agricultor Encontrado</td></tr>}

                </tbody>
            </table>
        </div>
    )
}