import { createContext, useState, useContext, ReactNode } from "react"

interface AuthContextType {
	token: string | null
	login: (jwt: string) => void
	logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
function useAuth(): AuthContextType {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error("no context")
	}
	return context
}

interface AuthProviderProps {
	children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
	const [token, setToken] = useState<string | null>(localStorage.getItem("token"))

	const login = (jwt: string) => {
		localStorage.setItem("token", jwt)
		setToken(jwt)
	}

	const logout = () => {
		localStorage.removeItem("token")
		setToken(null)
	}

	return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>
}

export { useAuth, AuthProvider }
