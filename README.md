# Setup Auth0 and Postgres using Neon

Neon is a cloud-native serverless Postgres database which enables you spin up a database instance quickly and connect with it has features like autoscaling, branching, and bottomless storage with its architecture that support separate compute and storage.

Get started with [Neon](https://console.neon.tech/sign_in).

This app is a Node.js backend API where [node-postgres](https://node-postgres.com/) is used to query the database in Neon and returning the data as JSON.

### Demo

![student objects](https://github.com/Terieyenike/SQL-notes/assets/25850598/bed20a09-d6a4-40a3-9829-f13d7386ad1f)

![deleting with an id in postman](https://github.com/Terieyenike/SQL-notes/assets/25850598/85a5cb35-ebfd-48e0-9d9f-8d3794174fdc)

### Deployed app

Student data

### Setup

**Clone the repo and install dependencies**

```
$ git clone
$ cd
$ npm install
```

### Environment variables

Head over to your dashboard in Neon and copy-paste the connection string and replace the dummy data with yours in [.env.local](.env.local)

### Start the server

```
$ npm run dev
```

### Tech stack

- Express
- node-postgres
- Postman
- Neon
