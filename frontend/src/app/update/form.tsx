'use client'
import Button from "@/components/button/component";
import { FormError } from "@/components/formError/component";
import Input from "@/components/input/component";
import Select from "@/components/select/component";
import { UserResponseDTO } from "@/DTOs/UserResponseDTO";
import { UsersService } from "@/services/UsersService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";


interface FormProps {
    users: UserResponseDTO[]
}

const UpdateSchema = z.object({
    fullName: z.string(),
    birthDate: z.optional(z.string()),
    phone: z.optional(z.string()),
    active: z.string()

})

type UpdateFormData = z.infer<typeof UpdateSchema>

export default function Form({ users }: FormProps) {


    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<UpdateFormData>({
        resolver: zodResolver(UpdateSchema)
    })

    const router = useRouter()
    const searchParams = useSearchParams()
    const _id = searchParams.get("id")

    const user = users.find(user => user._id === _id)

    async function SubmitForm(data: UpdateFormData) {
        try {
            await UsersService.update(_id, {
                fullName: data.fullName,
                birthDate: data.birthDate && new Date(data.birthDate).toISOString(),
                phone: data.phone,
                active: data.active === "true" ? true : false
            })

            toast.success("Agricultor Atualizado com Sucesso")

        } catch (error: any) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(SubmitForm)}>
            <Input
                label="Nome Completo"
                type="text"
                placeholder="Marcelo da Silva Sousa"
                {...register("fullName")}
                defaultValue={user && user.fullName}
            />
            {errors.fullName && <FormError message={errors.fullName.message} />}
            <Input
                label="Data de Nascimento"
                defaultValue={user?.birthDate ? new Date(user.birthDate).toISOString().split('T')[0] : ''}
                type="date"
                {...register("birthDate")} />
            {errors.birthDate && <FormError message={errors.birthDate.message} />}
            <Input
                label="Telefone"
                type="text"
                placeholder="(11) 99999-9999"
                defaultValue={user && user.phone}
                {...register("phone")}
            />
            {errors.phone && <FormError message={errors.phone.message} />}
            <Select
                label="Status"
                defaultValue={user && String(user.active)}
                {...register("active")}
            >
                <option value="true">Ativo</option>
                <option value="false">Inativo</option>
            </Select>
            {errors.active && <FormError message={errors.active.message} />}

            <div className="form-actions">
                <Button type="submit" name="Enviar" variant="success" disabled={isSubmitting} />
                <Button type="button" name="Voltar" variant="default" onClick={() => router.push("/")} />
            </div>
        </form>
    )


}