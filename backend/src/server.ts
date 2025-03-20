import { reset, seed } from "drizzle-seed"
import app from "./app"
import { db } from "./db"
import * as projects from "./db/projects"
import { Projects } from "./db/projects"

const port = 3000

async function seedDb() {
	await reset(db, projects)
	await seed(db, { Projects })
}

app.listen(port, () => {
	seedDb()
	console.log(`App listening at http://localhost:${port}`)
})
