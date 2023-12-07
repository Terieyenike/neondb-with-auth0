# Setup Auth0 and Postgres using Neon

Neon is a cloud-native serverless Postgres database which enables you spin up a database instance quickly and connect with it has features like autoscaling, branching, and bottomless storage with its architecture that support separate compute and storage.

Get started with [Neon](https://console.neon.tech/sign_in) and [Auth0](https://auth0.com/signup?place=header&type=button&text=sign%20up).

This app is a Node.js backend API where [node-postgres](https://node-postgres.com/) is used to query the database in Neon and returning the data as JSON.

### Demo

[![neon app with auth0](https://cdn.loom.com/sessions/thumbnails/99535d8cd3214a1ba284d38921322e18-with-play.gif)](https://www.loom.com/share/99535d8cd3214a1ba284d38921322e18)

### Setup

**Clone the repo and install dependencies**

```
$ git clone https://github.com/Terieyenike/neondb-with-auth0.git
$ cd neondb-with-auth0
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
- Embedded JavaScript (EJS)
- Neon
- Auth0

### Author

- [Teri](https://x.com/terieyenike)
