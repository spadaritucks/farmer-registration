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



const RegisterSchema = z.object({
    fullName: z.string(),
    cpf: z.string(),
    birthDate: z.optional(z.string()),
    phone: z.optional(z.string()),

})

type RegisterFormData = z.infer<typeof RegisterSchema>

export default function Register() {


    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<RegisterFormData>({
        resolver: zodResolver(RegisterSchema)
    })

    const router = useRouter()


    async function SubmitForm(data: RegisterFormData) {
        try {
            await UsersService.create({
                fullName: data.fullName,
                cpf: data.cpf,
                birthDate: data.birthDate && new Date(data.birthDate).toISOString(),
                phone: data.phone,
                active: true
            })

        } catch (error: any) {
            console.error(error)
        }
    }


    return (
        <section className="farmer-form">
            <h2>Cadastro do Agricultor</h2>
            <form onSubmit={handleSubmit(SubmitForm)}>
                <Input label="Nome Completo" type="text" {...register("fullName")} />
                <Input label="CPF" type="text" {...register("cpf")} />
                <Input label="Data de Nascimento" type="date" {...register("birthDate")} />
                <Input label="Telefone" type="text" {...register("phone")} />

                <div className="form-actions">
                    <Button type="submit" name="Enviar" variant="success" disabled={isSubmitting} />
                    <Button type="button" name="Voltar" variant="default" onClick={() => router.push("/")} />
                </div>
            </form>
        </section>
    )
}