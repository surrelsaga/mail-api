# mail-api

A NestJS backend that sends templated emails to contacts and keeps a record of every send.

## Project structure

```
src/
├── main.ts                  # app start: validation + error filter
├── app.module.ts            # root module: config + database + feature modules
├── common/
│   └── http-exception.filter.ts   # one consistent error shape for every error
├── database/
│   ├── ormconfig.ts         # settings shared by the app and the CLI
│   ├── datasource.ts        # what the TypeORM CLI reads (entities + migrations)
│   └── migrations/          # the schema, as files
├── templates/               # email templates (CRUD)
├── contacts/                # people to email (CRUD, unique email)
└── emails/                  # send an email, list and filter sent emails
```

Each feature folder has the same parts: `*.module.ts`, `*.controller.ts`, `*.service.ts`, `*.entity.ts` and a `dto/` folder.

## Tech stack

| What | Used |
|---|---|
| Framework | NestJS, TypeScript (Node.js) |
| Database | PostgreSQL, hosted on Supabase |
| ORM and migrations | TypeORM |
| Sending email | Nodemailer + Ethereal (a free test mail server, nothing reaches a real inbox) |
| Validation | class-validator, class-transformer |
| Tests | Vitest |

## Run locally

You need Node.js (a recent LTS) and a Postgres database (a free Supabase project works).

1. Install:
   ```
   npm install
   ```
2. Create a `.env` file in the project root:
   ```
   DATABASE_URL=<your postgres connection string>
   ```
   `.env` is in `.gitignore`. Never commit it.
3. Create the tables:
   ```
   npm run migration:run
   ```
4. Start the app:
   ```
   npm run start:dev
   ```
   It runs on http://localhost:3000 (set `PORT` to change it).

Sending an email (`POST /emails`) prints an Ethereal link in the terminal. Open it to see the message.
