# Presight Frontend Exercise

Full-stack user directory application built with:

* React + TypeScript
* Node.js + Express
* SQLite
* Docker

## Project Structure

presight-execise/
├── client/
├── server/
├── docker-compose.yml
└── README.md

## Prerequisites

- Node.js 22
- npm 10+
- Docker / Docker Compose (for Docker setup)

If you use NVM:
nvm install 22
nvm use 22

## Local Setup

Install dependencies from the project root:

npm install

### Initialize the database

npm run db:init --workspace=server

### Seed the database

npm run db:seed --workspace=server

The seed uses a fixed Faker seed so the generated dataset is deterministic across runs.

### Run the backend

npm run dev:server

Backend:

http://localhost:4000

Health check:

http://localhost:4000/api/health

### Run the frontend

In another terminal:

npm run dev:client

Frontend:

http://localhost:5173


## Docker

The project includes Docker configuration for both the React client and Node.js server.

Run the complete application from the project root:


docker compose up --build

Frontend:

http://localhost:8080

Backend:

http://localhost:4000

### Stop Docker containers

docker compose down

### Reset the Docker database

SQLite data is persisted using a Docker volume.

To remove the existing database and recreate the deterministic seed data:

docker compose down -v
docker compose up --build


## Deliverables

* React client source code in `client/`
* Node.js API server source code in `server/`
* SQLite database setup and deterministic seed logic
* Client and server `Dockerfile` configuration
* Root `docker-compose.yml`
* Local setup and database seeding instructions
* Docker Compose setup instructions