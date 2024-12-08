FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --unsafe-perm --allow-root

COPY . .

RUN npm run build

CMD ["npm", "run", "start:dev"]

EXPOSE 3002