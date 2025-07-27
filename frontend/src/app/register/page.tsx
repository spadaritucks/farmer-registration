'use client'
import Button from "@/components/button/component";
import Input from "@/components/input/component";
import { UsersService } from "@/services/UsersService";
import { zodResolver } from "@hookform/resolvers/zod";
import { watch } from "fs";
import { useForm } from "react-hook-form";
import z from "zod";



const RegisterSchema = z.object({
    fullName : z.string(),
    cpf: z.string(),
    birthDate : z.optional(z.string()),
    phone : z.optional(z.string()),

})

type RegisterFormData = z.infer<typeof RegisterSchema>

export default function Register () {


    const {register, handleSubmit, formState : {isSubmitting, errors}, watch} = useForm<RegisterFormData>({
        resolver : zodResolver(RegisterSchema)
    })


    async function SubmitForm(data : RegisterFormData) {
        try{
            console.log(data)
            await UsersService.create({
                fullName : data.fullName,
                cpf : data.cpf,
                birthDate : data.birthDate && new Date(data.birthDate).toISOString(),
                phone : data.phone,
                active : true
            })

        }catch(error: any){
            console.error(error)
        }
    }

    const fullName = watch("fullName")
    console.log(fullName)

    return(
        <section className="farmer-form">
            <h2>Cadastro do Agricultor</h2>
            <form onSubmit={handleSubmit(SubmitForm)}>
                <Input label="Nome Completo" type="text" {...register("fullName")} />
                <Input label="CPF" type="text" {...register("cpf")} />
                <Input label="Data de Nascimento" type="date" {...register("birthDate")} />
                <Input label="Telefone" type="text" {...register("phone")}/>
                <Button type="submit" name="Enviar" variant="default" disabled={isSubmitting} /> 
            </form>
        </section>
    )
}