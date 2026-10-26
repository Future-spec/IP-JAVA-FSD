# IP-JAVA-FSD

This repository contains the employee-management project, course exercises, and
documentation. The deployable web client is in `frontend/`; its REST API is the
Node/Express application in `backend/`. The Spring Boot application in
`company/` is a separate backend implementation and is not used by the selected
Node API deployment.

## Local setup

1. Install Node.js 20 or later and MySQL.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and set the local database password and database
   connection values.
4. Create the `company` database and run `backend/schema.sql`.
5. Run `npm run dev` to start the API on port 3000.
6. Serve `frontend/` from `http://localhost:5500` so its origin matches the
   default local CORS setting.

The Node API requires `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME`; it
accepts `DB_PORT` and `PORT` as optional values. Never commit `.env` or database
credentials.

## Deployment

Deploy `frontend/` to Vercel with the repository subdirectory
`IP-JAVA-FSD/` selected as the Vercel project root. The included `vercel.json`
builds a small runtime configuration file and publishes the static frontend.
Set the Vercel build environment variable `API_BASE_URL` to the public origin of
the separately hosted Node API, for example `https://api.example.com`.

Deploy `backend/` to a Node.js host that can reach a MySQL database. Configure
`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, and `CORS_ORIGIN` in
that host's environment. Set `CORS_ORIGIN` to the exact Vercel site origin.
Vercel serves the frontend; it does not host this long-running Node/MySQL
service. The database and backend need to be provisioned before the Vercel
build, because the build requires `API_BASE_URL`.

The Spring Boot variant in `company/` also reads
`SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, and
`SPRING_DATASOURCE_PASSWORD` from its runtime environment.
