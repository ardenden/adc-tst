import { ChangeEvent, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"
import { Projects } from "../types"
import { getProjects } from "../services/http.service"
import Spinner from "./Spinner"

function ProjectList() {
	const { token, logout } = useAuth()
	const [projects, setProjects] = useState<Projects[]>([])
	const [filteredProjects, setFilteredProjects] = useState<Projects[]>([])
	const [searchInput, setSearchInput] = useState<string>("")
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<string>("")

	function handleLogout() {
		logout()
	}

	async function handleGetProjects() {
		const queryString = window.location.search
		const params = new URLSearchParams(queryString)

		// add delay to show loading spinner
		setTimeout(async () => {
			try {
				const data = await getProjects(params, token)
				setProjects(data)
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message)
				} else {
					setError("Some error")
				}
			} finally {
				setIsLoading(false)
			}
		}, 1000)
	}

	useEffect(() => {
		handleGetProjects()
	}, [])

	function handleSearcInputChange(e: ChangeEvent<HTMLInputElement>) {
		setSearchInput(e.target.value)
	}

	useEffect(() => {
		setTimeout(() => {
			const filtered = projects.filter((project) =>
				project.name.toLowerCase().startsWith(searchInput.toLowerCase()),
			)
			setFilteredProjects(filtered)
		}, 250)
	}, [searchInput, projects])

	return (
		<div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4 gap-4">
			<h1 className="text-4xl font-bold text-center text-blue-600">Projects</h1>

			<input
				type="text"
				placeholder="filter by name"
				value={searchInput}
				onChange={handleSearcInputChange}
				className="p-2 border border-gray-300 rounded-md w-full max-w-4xl"
			/>

			<div className="relative w-full max-w-4xl">
				{isLoading && <Spinner />}

				<div className="overflow-x-auto">
					{filteredProjects.length ? (
						<table className="min-w-full table-auto bg-white border-collapse rounded-lg shadow-lg">
							<thead>
								<tr className="bg-blue-600 text-white">
									<th className="py-2 px-4 border-b">Name</th>
									<th className="py-2 px-4 border-b">Description</th>
								</tr>
							</thead>
							<tbody>
								{filteredProjects.map((project) => {
									return (
										<tr className="hover:bg-gray-100" key={project.id}>
											<td className="py-2 px-4 border-b">{project.name}</td>
											<td className="py-2 px-4 border-b">{project.description}</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					) : (
						<div>{error ? error : "No data"}</div>
					)}
				</div>
			</div>

			<button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-blue-600" onClick={handleLogout}>
				Logout
			</button>
		</div>
	)
}

export default ProjectList
