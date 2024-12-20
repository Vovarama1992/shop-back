
FROM node:18-alpine

# Устанавливаем необходимые зависимости для OpenSSL 1.1 и Prisma
RUN apk add --no-cache openssl libssl1.1 libstdc++ bash

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install --unsafe-perm --allow-root


COPY . .

RUN rm -rf node_modules/.prisma node_modules/@prisma node_modules/prisma dist

RUN npm install prisma --save-dev


RUN npx prisma generate


RUN npm run build


CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:dev"]


EXPOSE 3001