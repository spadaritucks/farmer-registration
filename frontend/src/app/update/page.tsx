import { UsersService } from "@/services/UsersService";
import "./styles.css"
import Form from "./form";


export default async function Update() {

    const users = await UsersService.getAll()

    return (
        <section className="farmer-form">
            <h2>Editar Agricultor</h2>
            <Form users={users} />
        </section>
    )
}