import express, { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || "secret-key"

router.get("/generate-token", async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const token = jwt.sign({}, JWT_SECRET, { expiresIn: "1h" })

		res.send({ token })
	} catch (error) {
		next(error)
	}
})

export default router
