FROM node:21.7.3-alpine3.20

WORKDIR /app/microservice

COPY package*.json ./

RUN apk add --no-cache npm

RUN npm install

COPY . ./

EXPOSE 3000

CMD [ "npm","run","start:dev","--host", "0.0.0.0" ]