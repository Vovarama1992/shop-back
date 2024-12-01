
FROM node:18-alpine


WORKDIR /app


COPY package.json package-lock.json ./
RUN npm install --unsafe-perm --allow-root


COPY . .

RUN rm -rf node_modules/.prisma \
           node_modules/@prisma \
           node_modules/prisma
           dist

RUN npm install prisma --save-dev


RUN npx prisma generate


RUN npm run build


CMD ["npx", "prisma", "migrate", "deploy"]


CMD ["npm", "run", "start:dev"]


EXPOSE 3001