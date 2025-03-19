# Usar a imagem oficial do Node.js
FROM node:18

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Expor a porta 3000
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "dev"]