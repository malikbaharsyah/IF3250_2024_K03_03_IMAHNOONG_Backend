FROM node:21-alpine

WORKDIR /app

COPY package*.json ./
# COPY ./prisma/schema.prisma ./prisma/
COPY .env ./
COPY . .

# RUN npx prisma generate

RUN npm install

CMD npm run dev