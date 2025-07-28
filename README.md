# Desafio Técnico – Cadastro de Agricultor
## Tecnologias usadas
- Backend : NestJS + TypeORM e MongoDB
- Frontend : NextJS

## Instruções para rodar o projeto localmente
- O projeto foi feito na base de um monorepo dividido em uma pasta backend (NestJs) e frontend (NextJS)
- O Banco de dados MongoDB foi criado via Docker Compose

### Clonar Repositorio
```bash  
git clone "https://github.com/spadaritucks/farmer-registration"
```
### Entrar na Pasta /backend
```bash  
cd backend
npm install
docker compose up -d
npm run start
```
### Entrar na Pasta /frontend
```bash  
cd frontend
npm install
npm run dev
```
