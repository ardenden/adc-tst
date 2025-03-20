import { useAuth } from "./components/AuthContext"
import ProjectList from "./components/ProjectList"
import { generateToken } from "./services/http.service"

function App() {
	const { token, login } = useAuth()

	async function handleLogin() {
		const token = await generateToken()
		login(token)
	}

	if (token) {
		return <ProjectList />
	} else {
		return (
			<div className="flex flex-col justify-center min-h-screen">
				<div className="flex justify-center space-x-4">
					<button
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
						onClick={handleLogin}
					>
						Login
					</button>
				</div>
			</div>
		)
	}
}

export default App
