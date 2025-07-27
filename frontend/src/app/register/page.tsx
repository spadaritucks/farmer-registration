import Button from "@/components/button/component";
import Input from "@/components/input/component";

export default function Register () {
    return(
        <section className="farmer-form">
            <h2>Cadastro do Agricultor</h2>
            <form action="">
                <Input label="Nome Completo" type="text" />
                <Input label="CPF" type="text" />
                <Input label="Data de Nascimento" type="date" />
                <Input label="Telefone" type="text"/>
                <Button type="submit" name="Enviar" variant="default"/> 
            </form>
        </section>
    )
}