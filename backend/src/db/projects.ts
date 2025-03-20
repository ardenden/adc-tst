import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core"

export const Projects = pgTable("projects", {
	id: serial().primaryKey(),
	name: varchar({ length: 255 }).notNull(),
	description: text().notNull(),
})
