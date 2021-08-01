import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Landing from './components/Landing'
import Navbar from './components/Navbar'
import { useAppSelector, useTheme } from './hooks'

export default function App() {
	const { address } = useAppSelector(state => state.user)
	const theme = useTheme()

	return (
		<Router>
			<div
				style={{
					background: theme.low,
					minHeight: '100vh'
				}}
			>
				<Navbar />
				<main>
					{address ? (
						<>
							<Route path="/" exact>
								<Dashboard />
							</Route>
						</>
					) : (
						<Landing />
					)}
				</main>
			</div>
		</Router>
	)
}
