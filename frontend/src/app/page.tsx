import { UsersService } from "@/services/UsersService";
import "./styles.css"
import FarmersTableList from "@/components/farmers-table-list/component";

export default  async function Home({ searchParams }: { searchParams: { [key: string]: string } }) {

  const fullName = searchParams.fullName || "";
  const cpf = searchParams.cpf || "";
  const active = searchParams.active  || "";

  const users  = await UsersService.getAll(fullName, cpf, active)


  return (
    <section className="farmers-list">
      <h1>Cadastro e Listagem dos Agricultores</h1>
      <FarmersTableList users={users}/>
    </section>
  )
}