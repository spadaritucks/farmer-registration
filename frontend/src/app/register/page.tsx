'use client'
import React, { useEffect } from "react";
import Button from "@/components/button/component";
import Input from "@/components/input/component";
import { UsersService } from "@/services/UsersService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import "./styles.css"
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormError } from "@/components/formError/component";
import { useNumericInput } from "@/utils/useNumericInput";
import { useCPF } from "@/utils/useCPF";



const RegisterSchema = z.object({
    fullName: z.string()
        .min(8, "O nome completo é obrigatório")
        .max(60, "O nome completo não pode ultrapassar os 60 caracteres"),
    cpf: z.string()
        .min(14, "O CPF é obrigatório")
        .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/ , "CPF inválido! Use o formato 000.000.000-00")
        .trim(),
    birthDate: z.optional(z.string()),
    phone: z.optional(z.string()),

})

type RegisterFormData = z.infer<typeof RegisterSchema>

export default function Register() {


    const { register, handleSubmit, formState: { isSubmitting, errors }, setValue } = useForm<RegisterFormData>({
        resolver: zodResolver(RegisterSchema)
    })

    const router = useRouter()

    const { cpf, handleChange } = useCPF()


    useEffect(() => {
        setValue("cpf", cpf)
    }, [cpf, setValue])


    async function SubmitForm(data: RegisterFormData) {
        try {
            await UsersService.create({
                fullName: data.fullName,
                cpf: data.cpf,
                birthDate: data.birthDate && new Date(data.birthDate).toISOString(),
                phone: data.phone,
                active: true
            })

            toast.success("Agricultor Cadastrado com Sucesso")

        } catch (error: any) {
            toast.error(error.message)
        }
    }



    return (
        <section className="farmer-form">
            <h2>Cadastro do Agricultor</h2>
            <form onSubmit={handleSubmit(SubmitForm)}>
                <Input
                    label="Nome Completo"
                    type="text"
                    placeholder="Marcelo da Silva Sousa"
                    {...register("fullName")}
                />
                {errors.fullName && <FormError message={errors.fullName.message} />}
                <Input
                    label="CPF"
                    type="text"
                    placeholder="000.000.000-00"
                    value={cpf}
                    onInput={useNumericInput}
                    {...register("cpf", {
                        onChange: handleChange
                    })}
                />
                {errors.cpf && <FormError message={errors.cpf.message} />}
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