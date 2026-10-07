                 ┌──────────────────┐
                 │ PostgreSQL       │
                 │ Primary          │
                 │ :5432            │
                 └────────┬─────────┘
                          │
                 Streaming Replication
                          │
              ┌───────────┴───────────┐
              ▼                       ▼
     ┌──────────────────┐    ┌──────────────────┐
     │ PostgreSQL       │    │ PostgreSQL       │
     │ Replica 1        │    │ Replica 2        │
     │ :5433            │    │ :5434            │
     └──────────────────┘    └──────────────────┘

```
docker network create postgres-net
```

## Primary

```sh
docker run -d \
  --name postgresql-primary \
  --network postgres-net \
  -p 5432:5432 \
  -e POSTGRESQL_POSTGRES_PASSWORD=postgres \
  -e POSTGRESQL_REPLICATION_MODE=master \
  -e POSTGRESQL_REPLICATION_USER=repl_user \
  -e POSTGRESQL_REPLICATION_PASSWORD=repl_password \
  -e POSTGRESQL_USERNAME=app_user \
  -e POSTGRESQL_PASSWORD=app_password \
  -e POSTGRESQL_DATABASE=app_db \
  bitnami/postgresql:latest
```

## Replica 1
```sh
docker run -d \
  --name postgresql-replica-1 \
  --network postgres-net \
  -p 5433:5432 \
  -e POSTGRESQL_REPLICATION_MODE=slave \
  -e POSTGRESQL_MASTER_HOST=postgresql-primary \
  -e POSTGRESQL_MASTER_PORT_NUMBER=5432 \
  -e POSTGRESQL_REPLICATION_USER=repl_user \
  -e POSTGRESQL_REPLICATION_PASSWORD=repl_password \
  -e POSTGRESQL_PASSWORD=postgres \
  bitnami/postgresql:latest
```

## Replica 2

```sh
docker run -d \
  --name postgresql-replica-2 \
  --network postgres-net \
  -p 5434:5432 \
  -e POSTGRESQL_REPLICATION_MODE=slave \
  -e POSTGRESQL_MASTER_HOST=postgresql-primary \
  -e POSTGRESQL_MASTER_PORT_NUMBER=5432 \
  -e POSTGRESQL_REPLICATION_USER=repl_user \
  -e POSTGRESQL_REPLICATION_PASSWORD=repl_password \
  -e POSTGRESQL_PASSWORD=postgres \
  bitnami/postgresql:latest
```

```
Application
     │
     ├── WRITE ──> Primary
     │
     └── READ ───> Replica 1 / Replica 2
```