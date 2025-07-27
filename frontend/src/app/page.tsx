import { UsersService } from "@/services/UsersService";
import "./styles.css"
import FarmersTableList from "@/components/farmers-table-list/component";

export default  async function Home() {

  const users  = await UsersService.getAll()


  return (
    <section className="farmers-list">
      <h1>Cadastro e Listagem dos Agricultores</h1>
      <FarmersTableList users={users}/>
    </section>
  )
}