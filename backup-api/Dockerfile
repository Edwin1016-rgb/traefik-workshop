FROM node:16

WORKDIR /app

# Copiar archivos necesarios
COPY package.json ./
RUN npm install

# Copiar el código fuente
COPY . .

# Exponer el puerto que usa tu API
EXPOSE 3000

# Comando de inicio
CMD ["node", "server.js"]
