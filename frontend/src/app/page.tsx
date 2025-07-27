"use client"
import Button from "@/components/button/component";
import { useRouter } from "next/navigation";
import "./styles.css"

export default function Home() {

  const router = useRouter()

  return (
    <section className="farmers-list">
      <h1>Cadastro e Listagem dos Agricultores</h1>
      <div className="list-container">
        <div className="actions">
          <Button name="Cadastrar Agricultor" variant="success" onClick={() => router.push("/register")} />
        </div>
        <table>
          <thead>
            <tr>
              <th>Nome Completo</th>
              <th>CPF</th>
              <th>Data de Nascimento</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({length : 10}).map((_,index) => (
              <tr key={index}> 
                <td>Thiago Henrique</td>
                <td>000.000.000.00</td>
                <td>29/11/2002</td>
                <td>Ativo</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}