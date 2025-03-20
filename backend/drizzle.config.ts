import { defineConfig } from "drizzle-kit"

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/db/*",
	out: "./drizzle",
	dbCredentials: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		ssl: false,
	},
	migrations: {
		prefix: "timestamp",
		schema: process.env.DB_SCHEMA,
	},
	verbose: true,
	strict: true,
	casing: "snake_case",
})
