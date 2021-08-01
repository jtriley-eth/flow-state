import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import sun from '../assets/sun.svg'
import moon from '../assets/moon.svg'
import navbar from '../styles/Navbar.module.css'
import { useAppDispatch, useAppSelector, useTheme } from '../hooks'
import { toggleTheme } from '../redux'

export default function Navbar() {
	const { isDark } = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()
	const theme = useTheme()

	return (
		<header className={navbar.header} style={{ background: theme.mid }}>
			<div style={{ flex: 1 }} />

			<Link to="/" className={navbar.brand}>
				<img src={logo} alt="Logo" className={navbar.logo} />
			</Link>

			<div className={navbar.switchContainer}>
				<div
					className={navbar.switch}
					onClick={() => dispatch(toggleTheme())}
				>
					<div
						className={navbar.switchSlider}
						style={{
							transform: isDark
								? 'translateX(24px)'
								: 'translateX(0)',
							background: theme.mid
						}}
					>
						<img
							src={isDark ? sun : moon}
							alt="theme"
							className={navbar.switchIcon}
						/>
					</div>
				</div>
			</div>
		</header>
	)
}
