FROM node:21.7.3

WORKDIR /app/microservice/

COPY package*.json ./

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

RUN npm install

RUN curl -o wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
chmod +x wait-for-it.sh

COPY . ./

EXPOSE 5000

CMD ["./wait-for-it.sh", "postgresDB-product:5432", "--timeout=90", "--", "npm", "run", "start:dev", "--host", "0.0.0.0"]