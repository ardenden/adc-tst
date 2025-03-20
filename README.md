## Express + React monorepo, with TypeScript, Tailwind CSS, and Drizzle ORM

### Setup
* Install Node.js v20.6.0+, preferably v22+
* Go inside directory after cloning and `npm install`
* Install PostgreSQL, preferably v16+
    * Create your database
    * In the backend directory, create `.env` file and copy `.env.example` contents, modify values as needed
* `npm run database` to generate migrations and create tables
* `npm run start` to start both backend server and frontend app
* Table will be seeded on start
* Open `http://localhost:5173/` in your browser


## Features
### Backend
* [Drizzle ORM](https://orm.drizzle.team/) for everything database
* JWT, an endpoint for generating token
* One `GET` endpoint for querying all data
    * protected with jwt
    * with offset based pagination
* Minimal error handler middleware
### Frontend
* JWT authentication, needs to be logged in to view component
* Data are displayed with a `<table>`, text input for filtering
* Loading spinner while fetching data
* Manual pagination only via url params by appending `limit` and `page` keys
    * example `?limit=2&page=1`
* Logout button, component will be hidden again once logged out


#### Code is auto formatted on save with prettier, preferences set via `.prettierrc` file
#### React created with Vite
#### Manually setup Express
