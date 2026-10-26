# IP-JAVA-FSD

This repository contains the employee-management project, course exercises, and
documentation. The deployable web client is in `frontend/`; its REST API is the
Node/Express application in `backend/`. The Spring Boot application in
`company/` is a separate backend implementation and is not used by the selected
Node API used by the frontend.

## Local setup

1. Install Node.js 20 or later and MySQL.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and set the local database password and database
   connection values.
4. Create the `company` database and run `backend/schema.sql`.
5. Run `npm run dev` to start the API on port 3000.
6. Run `npm run build` to generate the frontend's local runtime configuration.
   It defaults to the API at `http://localhost:3000`; set `API_BASE_URL` in the
   shell before building if the API uses a different local origin.
7. Serve `frontend/` from `http://localhost:5500` so its origin matches the
   default local CORS setting.

The Node API requires `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME`; it
accepts `DB_PORT` and `PORT` as optional values. Never commit `.env` or database
credentials.

The Spring Boot variant in `company/` also reads
`SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, and
`SPRING_DATASOURCE_PASSWORD` from its runtime environment.
