'use client'
import Button from "@/components/button/component";
import Input from "@/components/input/component";
import { UsersService } from "@/services/UsersService";
import { zodResolver } from "@hookform/resolvers/zod";
import { watch } from "fs";
import { useForm } from "react-hook-form";
import z from "zod";
import "./styles.css"
import { useRouter } from "next/navigation";
import { FormError } from "@/components/formError/component";



const UpdateSchema = z.object({
    fullName: z.string(),
    birthDate: z.optional(z.string()),
    phone: z.optional(z.string()),

})

type UpdateFormData = z.infer<typeof UpdateSchema>

export default function Update() {


    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<UpdateFormData>({
        resolver: zodResolver(UpdateSchema)
    })

    const router = useRouter()


    async function SubmitForm(data: UpdateFormData) {
        try {
            await UsersService.update({
                fullName: data.fullName,
                birthDate: data.birthDate && new Date(data.birthDate).toISOString(),
                phone: data.phone,
            })

        } catch (error: any) {
            console.error(error)
        }
    }


    return (
        <section className="farmer-form">
            <h2>Editar Agricultor</h2>
            <form onSubmit={handleSubmit(SubmitForm)}>
                <Input
                    label="Nome Completo"
                    type="text"
                    placeholder="Marcelo da Silva Sousa"
                    {...register("fullName")}
                />
                {errors.fullName && <FormError message={errors.fullName.message} />}
                <Input
                    label="Data de Nascimento"
                    type="date"
                    {...register("birthDate")} />
                {errors.birthDate && <FormError message={errors.birthDate.message} />}
                <Input
                    label="Telefone"
                    type="text"
                    placeholder="(11) 99999-9999"
                    {...register("phone")}
                />
                {errors.phone && <FormError message={errors.phone.message} />}

                <div className="form-actions">
                    <Button type="submit" name="Enviar" variant="success" disabled={isSubmitting} />
                    <Button type="button" name="Voltar" variant="default" onClick={() => router.push("/")} />
                </div>
            </form>
        </section>
    )
}