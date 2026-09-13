# Presight Frontend Exercise

Full-stack user directory application built with:

* React + TypeScript
* Node.js + Express
* SQLite
* Docker

## Prerequisites

* Node.js 22
* npm 10+
* Docker / Docker Compose for containerized setup

If you use NVM:

nvm install 22
nvm use 22


Verify:


node -v
npm -v


## Project Structure


presight-execise/
├── client/
├── server/
├── docker-compose.yml
└── README.md


## Local Setup

Install dependencies from the project root:


npm install


### Initialize the database


npm run db:init --workspace=server


### Seed the database


npm run db:seed --workspace=server


The seed uses a fixed Faker seed so the generated dataset remains deterministic across runs.

### Run client and server together

From the project root:


npm run dev


This starts:


Frontend: http://localhost:5173
Backend:  http://localhost:4000


Health check:


http://localhost:4000/api/health


### Run client and server separately

Backend:


npm run dev:server


Frontend:


npm run dev:client


## Docker

Build and run the complete application:


docker compose up --build


Frontend:


http://localhost:8080


Backend:


http://localhost:4000


Health check:


http://localhost:4000/api/health


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
* Client and server Docker configuration
* Root `docker-compose.yml`
* Local setup and database seeding instructions
* Docker Compose setup instructions
