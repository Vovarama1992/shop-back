FROM node:18-alpine

WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --unsafe-perm --allow-root

# Устанавливаем OpenSSL
RUN apk add --no-cache openssl

# Копируем остальные файлы проекта
COPY . .

# Генерируем Prisma клиент заново
RUN npx prisma generate

# Собираем приложение
RUN npm run build

# Запускаем приложение
CMD ["node", "dist/user-service/main.js"]

EXPOSE 3001