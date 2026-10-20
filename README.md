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


### Container troubleshooting

The backend healthcheck calls `/api/health` every 30 seconds using Node.js.
The frontend starts after the backend becomes healthy. This checks HTTP health,
not database readiness; an unhealthy status alone does not restart a container.

| Command | Useful for |
| --- | --- |
| `docker compose ps` | Show container names, ports, and backend health status. |
| `docker compose logs server` | Review backend startup and error logs. |
| `docker compose logs -f server` | Follow backend logs live; Ctrl+C stops following. |
| `docker compose restart server` | Restart the backend after troubleshooting; does not rebuild its image. |
| `docker inspect <container>` | Inspect container configuration and healthcheck results under `State.Health`; use a name from `docker compose ps`. |
| `docker compose down` | Stop and remove the stack while keeping the SQLite named volume. |
| `docker compose down -v` | Remove the stack and its named volume, deleting the stored SQLite data. Use only when intentionally resetting the database. |

Backend request logs use `METHOD PATH STATUS DURATION`, for example
`GET /api/users 200 42ms`. View them with `docker compose logs server`, or
follow new requests live with `docker compose logs -f server`.
Responses with **4xx** status codes indicate client-side problems such as invalid
queries, unknown routes, or rate limits. **5xx** responses indicate server-side
failures; look for an accompanying `[error]` entry with the method, path, error
type, and stack frames. Query strings, headers, request bodies, and raw error
messages are omitted to avoid logging sensitive request data.

## Deliverables

* React client source code in `client/`
* Node.js API server source code in `server/`
* SQLite database setup and deterministic seed logic
* Client and server Docker configuration
* Root `docker-compose.yml`
* Local setup and database seeding instructions
* Docker Compose setup instructions
