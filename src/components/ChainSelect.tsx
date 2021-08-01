import { useState } from 'react'
import { useAppDispatch, useTheme } from '../hooks'
import chainSelect from '../styles/ChainSelect.module.css'
import styles from '../styles/Global.module.css'
import type { ChainName } from '../types'
import { setChain } from '../redux/userSlice'

export default function ChainSelect() {
	const [userChain, setUserChain] = useState<'' | ChainName>('')
	const theme = useTheme()
	const dispatch = useAppDispatch()

	const handleSubmit = () => userChain && dispatch(setChain(userChain))

	return (
		<div className={chainSelect.screen}>
			<div className={styles.card}>
				<div className={styles.cardHeader}>
					<h2 style={{ color: theme.text }}>Unsupported Chain</h2>
				</div>
				<div className={chainSelect.content}>
					<p className={chainSelect.p} style={{ color: theme.text }}>
						It appears your selected chain is not currently
						supported by the Superfluid Protocol.
					</p>
					<div className={chainSelect.form}>
						<h3 style={{ color: theme.text }}>
							Please Select a Supported Chain
						</h3>
						<select
							className={styles.input}
							style={{ color: theme.text }}
							onChange={e =>
								setUserChain(e.target.value as ChainName)
							}
							value={userChain}
						>
							<option value="xdai">xDai</option>
							<option value="matic">MATIC</option>
							<option value="mumbai">Mumabi</option>
							<option value="goerli">Goerli</option>
							<option value="ropsten">Ropsten</option>
							<option value="kovan">Kovan</option>
							<option value="rinkeby">Rinkeby</option>
						</select>
						<div className={styles.button} onClick={handleSubmit}>
							Submit
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
