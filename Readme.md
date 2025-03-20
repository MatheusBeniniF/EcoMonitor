# 📚 API de Leituras Ambientais

Esta é uma API RESTful desenvolvida em Node.js com Express e Sequelize, projetada para gerenciar leituras ambientais. A API permite criar, ler, atualizar e deletar leituras, além de fornecer endpoints para filtrar e consultar dados específicos.

## 🚀 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para construção da API.
- **Sequelize**: ORM para interagir com o banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional.
- **Docker**: Containerização da aplicação e do banco de dados.
- **Swagger**: Documentação interativa da API.

## 📋 Requisitos

- Node.js (v18 ou superior)
- Docker e Docker Compose
- PostgreSQL

## 🛠️ Como Executar o Projeto

1. **Clone o repositório**

   ```bash
   git clone git@github.com:seu-usuario/EcoMonitor.git
   cd EcoMonitor
   ```

2. **Configure o ambiente**

   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

   ```env
   DB_USER=root
   DB_PASSWORD=root
   DB_NAME=leituras_db
   DB_HOST=postgres_db
   DB_PORT=5432
   ```

3. **Suba os contêineres com Docker Compose**

   Na raiz do projeto, execute:

   ```bash
   docker-compose up --build
   ```

   Isso irá:

   - Construir a imagem da API.
   - Subir o contêiner do PostgreSQL.
   - Executar as migrações e seeders.

4. **Instale as dependências do frontend**

   Navegue até o diretório `frontend` e instale as dependências:

   ```bash
   cd frontend
   npm install
   ```

5. **Execute o frontend**

   Ainda no diretório `frontend`, execute:

   ```bash
   npm run dev
   ```

6. **Acesse a API**

   A API estará disponível em: [http://localhost:3000/api](http://localhost:3000/api)

   A documentação interativa (Swagger UI) estará disponível em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## 📊 Endpoints da API

### Leituras

- `GET /api/leituras`: Lista todas as leituras (filtro opcional por local).
- `GET /api/leituras/:id`: Retorna uma leitura específica pelo ID.
- `POST /api/leituras`: Cria uma nova leitura.
- `PUT /api/leituras/:id`: Atualiza uma leitura existente.
- `DELETE /api/leituras/:id`: Deleta uma leitura.

## 🐳 Executando com Docker

### Comandos úteis

- **Subir os contêineres:**

  ```bash
  docker-compose up --build
  ```

- **Parar os contêineres:**

  ```bash
  docker-compose down
  ```

- **Executar migrações:**

  ```bash
  docker exec -it api_container npx sequelize-cli db:migrate
  ```

- **Executar seeders:**

  ```bash
  docker exec -it api_container npx sequelize-cli db:seed:all
  ```

- **Acessar o banco de dados:**

  ```bash
  docker exec -it postgres_db psql -U root -d leituras_db
  ```

## 🧪 Testes

Para executar os testes automatizados, utilize o comando:

```bash
docker exec -it api_container npm test
```

## 📝 Documentação da API

A documentação da API foi criada usando Swagger. Para acessar a interface interativa, abra o navegador e visite: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

