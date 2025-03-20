import express, { NextFunction, Request, Response } from "express"
import { verifyToken } from "src/services/authentication.service"
import { getProjects } from "src/services/projects.service"
import { RequestQuery } from "src/types/http.type"

const router = express.Router()

router.get("/", verifyToken, async (req: Request<{}, {}, {}, RequestQuery>, res: Response, next: NextFunction) => {
	try {
		const result = await getProjects(req.query)

		res.status(200).send(result)
	} catch (error) {
		next(error)
	}
})

export default router
