import { Projects } from "../types"

export async function generateToken() {
	try {
		const response = await fetch("http://localhost:3000/auth/generate-token")
		const data = await response.json()
		return data.token
	} catch (error) {
		console.error("Error generating token: ", error)
	}
}

export async function getProjects(params: URLSearchParams, token: string | null) {
	const response = await fetch(`http://localhost:3000/api/projects?${params.toString()}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

	if (!response.ok) {
		throw new Error(`Error: ${response.status}`)
	}

	const data = (await response.json()) as Projects[]
	return data
}
