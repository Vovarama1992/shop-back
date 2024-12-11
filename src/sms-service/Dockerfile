FROM node:18-alpine

WORKDIR /app

# Копируем весь проект в контейнер
COPY ./ /app/

# Устанавливаем зависимости
RUN npm install --unsafe-perm --allow-root

# Собираем приложение
RUN npm run build

# Запускаем сервис
CMD ["node", "dist/sms-service/main.js"]

EXPOSE 3002