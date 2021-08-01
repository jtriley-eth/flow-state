import { useState } from 'react'
import { useTheme, useAppDispatch } from '../hooks'
import landing from '../styles/Landing.module.css'
import styles from '../styles/Global.module.css'
import AnimationCanvas from './AnimationCanvas'
import { ChainName } from '../types'
import { setAddressAsync, setChainAsync, setAddress, setChain } from '../redux'

export default function Landing() {
	const [addr, setAddr] = useState('')
	const [chainName, setChainName] = useState<ChainName>('xdai')
	const theme = useTheme()
	const dispatch = useAppDispatch()

	const handleMetamask = () => {
		// empty strings trigger metamask
		dispatch(setChainAsync())
		dispatch(setAddressAsync())
	}

	const handleSubmit = () => {
		dispatch(setChain(chainName))
		dispatch(setAddress(addr))
	}

	return (
		<div className={landing.screen}>
			<div className={landing.canvas}>
				<AnimationCanvas />
			</div>
			<div
				className={`${styles.card} ${landing.card}`}
				style={{
					background: `${theme.mid}cc`
				}}
			>
				<div className={styles.cardHeader}>
					<h2 style={{ color: theme.text }}>Flow State</h2>
				</div>
				<p style={{ color: theme.text }}>
					Connect a wallet to continue.
				</p>
				<div className={landing.options} style={{ color: theme.text }}>
					<div className={styles.button} onClick={handleMetamask}>
						Metamask
					</div>
					<div className={landing.orContainer}>
						<p
							className={landing.or}
							style={{ background: theme.mid }}
						>
							OR
						</p>
					</div>
					<div className={landing.form}>
						<p>Enter your address</p>
						<input
							type="text"
							className={styles.input}
							style={{ color: theme.text }}
							placeholder="0x..."
							onChange={e => setAddr(e.target.value)}
							value={addr}
						/>
					</div>
					<div className={landing.form}>
						<p>Select a Chain</p>
						<select
							className={styles.input}
							style={{ color: theme.text }}
							onChange={e =>
								setChainName(e.target.value as ChainName)
							}
							value={chainName}
						>
							<option value="xdai">xDai</option>
							<option value="matic">MATIC</option>
							<option value="mumbai">Mumabi</option>
							<option value="goerli">Goerli</option>
							<option value="ropsten">Ropsten</option>
							<option value="kovan">Kovan</option>
							<option value="rinkeby">Rinkeby</option>
						</select>
					</div>
					<div className={styles.button} onClick={handleSubmit}>
						Submit
					</div>
				</div>
			</div>
		</div>
	)
}
