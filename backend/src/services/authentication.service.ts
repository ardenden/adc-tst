import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { RequestQuery } from "src/types/http.type"

const JWT_SECRET = process.env.JWT_SECRET || "secret-key"

export function verifyToken(req: Request<{}, {}, {}, RequestQuery>, res: Response, next: NextFunction) {
	const token = req.header("Authorization")?.replace("Bearer ", "")

	if (!token) {
		res.status(403).send("Forbidden")
		return
	}

	try {
		jwt.verify(token, JWT_SECRET)
		next()
	} catch (error) {
		next(error)
	}
}
