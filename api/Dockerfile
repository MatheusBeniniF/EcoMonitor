# Use a imagem oficial do Node.js
FROM node:16

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o código fonte para o diretório de trabalho dentro do container
COPY . .

# Exponha a porta que o app vai rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
