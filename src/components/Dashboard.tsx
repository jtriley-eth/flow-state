import dashboard from '../styles/Dashboard.module.css'
import { useAppDispatch, useAppSelector, useTheme } from '../hooks'
import Chart from './Chart'
import { useEffect, useState } from 'react'
import ChainSelect from './ChainSelect'
import { getChartData } from '../helpers/accounting'
import type { ChartData } from '../types'
import { setAccountDataAsync } from '../redux/userSlice'

export default function Dashboard() {
	const [chartData, setChartData] = useState<ChartData | null>(null)
	const { address, chain, accountData } = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()
	const theme = useTheme()

	useEffect(() => {
		if (address && chain !== 'unknown') {
			dispatch(setAccountDataAsync({ address, chain }))
		}
	}, [address, chain, dispatch])

	useEffect(() => {
		// temp constants
		const startTime = Math.floor(Date.now() / 1000)
		const endTime = startTime - 2.628e6
		const symbol = 'fDAIx'

		if (accountData.events.length !== 0) {
			console.log('events!')
			setChartData(
				getChartData(
					accountData.events,
					startTime,
					endTime,
					symbol,
					address
				)
			)
		} else {
			console.log('no events: ', accountData.events)
		}
	}, [accountData, address])

	if (chain === 'unknown') {
		return <ChainSelect />
	}

	return (
		<div className={dashboard.screen}>
			{chartData ? (
				<Chart chartData={chartData} />
			) : (
				<p style={{ color: theme.text }}>Try again dumbass</p>
			)}
		</div>
	)
}
