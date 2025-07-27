'use client'
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
    fullName: z.string({ message: "O nome completo é obrigatório" }),
    cpf: z.string({ message: "CPF é obrigatório" }),
    birthDate: z.optional(z.string()),
    phone: z.optional(z.string()),

})

type RegisterFormData = z.infer<typeof RegisterSchema>

export default function Register() {


    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<RegisterFormData>({
        resolver: zodResolver(RegisterSchema)
    })

    const router = useRouter()

    const {cpf,handleChange} = useCPF()


    async function SubmitForm(data: RegisterFormData) {
        console.log(data)
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
            toast.error(error)
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