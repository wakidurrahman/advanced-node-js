# 💁‍♂️ Working with Databases storage.

Many applications require data access and storage.

- In a relational database, the data will likely have a defined relationship, organized into tables.
- NoSQL databases suit data where there isn't an easily predefined structure, or where flexibility in the data structure is required.

> [!NOTE]
> We can `persist` data to both `SQL` and `NoSQL` databases with NodeJS.

> [!IMPORTANT]
> we will use Docker to provision/rule/law databases in containers

> [!TIP]
> Docker to provision containerized `MySQL`, `PostgreSQL`, `MongoDB`, and `Redis` data stores.

Using a database container is common when building **scalable** and **resilient** architectures particularly when using a container `orchestrator` such as `Kubernetes`.

The `dotenv` module loads environment variables from a `.env` file into the Node.js `process`. Where necessary, we will be storing database `credentials` in a `.env` file and then using the `dotenv` module to `parse` these into our Node.js process.

## #️⃣ Connecting and persisting to a MySQL database

- 👉 SQL (Structured Query Language): is a standard for communicating with relational database.
- 👉 (RDBMSes) Relational Database Management Systems

MySQL is the world's most popular open source database.

Starting a MySQL instance is simple:

```bash
$ docker run --p 3306:3306 --name node-mysql -e MYSQL_ROOT_PASSWORD=secret -d mysql:8.0
```

## #️⃣ Connecting and persisting to a PostgreSQL database

PostgreSQL is an open source object-relational database that is still commonly used. PostgreSQL can be used as both a relational and document database.

```bash
$ docker run --p 5432:5432 --name node-postgres -e POSTGRES_PASSWORD=secret -d postgres:latest
```
