import { asc } from "drizzle-orm"
import { db } from "../db"
import { Projects } from "../db/projects"
import { RequestQuery } from "src/types/http.type"

export async function getProjects(query: RequestQuery) {
	const { limit, page } = query
	let pageNumber = Number(page)
	if (pageNumber > 0) pageNumber--
	const offset = Number(limit) * pageNumber

	const projects = await db.select().from(Projects).orderBy(asc(Projects.id)).limit(Number(limit)).offset(offset)

	return projects
}
