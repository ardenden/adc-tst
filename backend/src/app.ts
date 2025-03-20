import express from "express"
import cors from "cors"
import projectsRouter from "./routes/projects.route"
import authRouter from "./routes/authentication.route"
import { errorHandler } from "./services/error-handler.service"

const app = express()
app.use(cors())
app.use(express.json())
app.use("/auth", authRouter)
app.use("/api/projects", projectsRouter)
app.use(errorHandler)

export default app
