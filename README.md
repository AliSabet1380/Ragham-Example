# Ragham Co Example

## Clone the repo and install dependencies via `bun`:

```bash

bun install

```

## Generate Prisma Client via `db:generate` command:

```bash

bun db:generate

```

## Run the server via `dev` command:

```bash

bun dev

```

## Send Request to the server

# Notice

- I use server less postgresql database for this project becuase simplicity and performance
- for use role you can create your own account ro use this account ====> Email: user1@example.com Password: user1234
- for admin role you should use this account ====> Email: admin1@example.com Password: admin1234
- the default port is 4000
- the env file is important, so i use remove it from .gitignore
- you can add your own database connection string in .env file and change the database type in prisma/schema.prisma
- add your own prettier config in .prettierrc file

# Explanations

- This project is simular to MVC architecture but has some differences
- I Tried to make it modular and easy to understand
- I its compatible with micro-services architecture
