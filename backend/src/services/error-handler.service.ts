import { NextFunction, Request, Response } from "express"
import { HttpError } from "http-errors"

export function errorHandler(err: HttpError, _req: Request, res: Response, _next: NextFunction) {
	console.error(err.message)

	res.status(err.status || 500).json({ error: err.message || "Internal Server Error" })
}
