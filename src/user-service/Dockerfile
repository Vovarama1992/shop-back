FROM node:18-alpine

WORKDIR /app

# Копируем весь проект в контейнер
COPY ./ /app/

# Устанавливаем зависимости
RUN npm install --unsafe-perm --allow-root

# Устанавливаем OpenSSL
RUN apk add --no-cache openssl

# Генерируем Prisma клиент
RUN npm install prisma --save-dev
RUN npx prisma generate 

# Собираем приложение
RUN npm run build

# Запускаем приложение
CMD ["node", "dist/user-service/main.js"]

EXPOSE 3001