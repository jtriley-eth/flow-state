import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'
import { useTheme } from '../hooks'
import type { ChartData } from '../types'

type ChartProps = {
	chartData: ChartData
}

export default function Chart({ chartData }: ChartProps) {
	const theme = useTheme()

	return (
		<AreaChart width={600} height={400} data={chartData}>
			<defs>
				<linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
					<stop
						offset="5%"
						stopColor={theme.primary}
						stopOpacity={0.8}
					/>
					<stop
						offset="95%"
						stopColor={theme.primary}
						stopOpacity={0}
					/>
				</linearGradient>
			</defs>
			<XAxis stroke="#888" tick={false} />
			<YAxis stroke="#888" />
			<Tooltip
				contentStyle={{
					background: theme.mid,
					borderRadius: 4,
					borderColor: theme.divider
				}}
				labelStyle={{
					color: theme.text
				}}
			/>
			<Area
				type="monotone"
				dataKey="balance"
				stroke={theme.primary}
				fillOpacity={1}
				fill="url(#colorBalance)"
			/>
		</AreaChart>
	)
}
