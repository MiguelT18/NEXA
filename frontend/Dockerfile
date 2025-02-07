# Usa una imagen base de Node.js 22 con Alpine
FROM node:22-alpine 

# Configurar el directorio de trabajo
WORKDIR /app

# Instalar SOLO Bun
RUN npm install -g bun@latest

# Copiar archivos de dependencias de Bun
COPY frontend/package.json frontend/bun.lock ./

# Instalar dependencias con Bun
RUN bun install --frozen-lockfile

# Copiar el código del frontend
COPY frontend/ .

# Exponer el puerto de Next.js
EXPOSE 3000

# Comando de ejecución en modo desarrollo
CMD ["bun", "dev"]
