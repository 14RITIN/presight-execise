FROM node:22-bookworm-slim

WORKDIR /app

COPY server/package*.json ./

RUN npm install

COPY server ./

RUN npm run build

RUN chmod +x docker-entrypoint.sh

EXPOSE 4000

ENTRYPOINT ["./docker-entrypoint.sh"]