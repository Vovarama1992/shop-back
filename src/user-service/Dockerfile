FROM node:18-alpine

WORKDIR /app

# Копируем только package.json и устанавливаем зависимости
COPY ./ /app/
RUN npm install --unsafe-perm --allow-root

# Удаляем лишние модули и генерируем Prisma клиент
RUN rm -rf node_modules/.prisma node_modules/@prisma node_modules/prisma dist
RUN npm install prisma --save-dev
RUN npx prisma generate

# Собираем приложение
RUN npm run build

# Запускаем приложение
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:dev"]

EXPOSE 3001