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

# Запускаем миграции и сервис
CMD ["sh", "-c", "echo 'Running migrations...' && npx prisma migrate deploy && echo 'Starting user-service...' && node dist/user-service/main.js || echo 'Failed to start user-service'"]

EXPOSE 3001