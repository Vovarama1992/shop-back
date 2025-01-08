FROM node:18-alpine

WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --unsafe-perm --allow-root

# Устанавливаем дополнительные зависимости (например, class-transformer)
RUN npm install class-transformer --save

# Устанавливаем OpenSSL
RUN apk add --no-cache openssl

# Копируем остальные файлы проекта
COPY . .

# Генерируем Prisma клиент заново
RUN npx prisma generate

# Собираем приложение
RUN npm run build

# Запускаем сервис
CMD ["sh", "-c", "echo 'Starting product-service...' && node dist/product-service/main.js || echo 'Failed to start product-service'"]

EXPOSE 3003