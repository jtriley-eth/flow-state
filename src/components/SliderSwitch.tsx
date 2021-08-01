import { useState } from 'react'
import { useTheme } from '../hooks'

import sliderSwitch from '../styles/Switch.module.css'

export default function SliderSwitch(props: { onToggle?: () => any }) {
	const [isOn, setIsOn] = useState(false)
	const { onToggle } = props
	const theme = useTheme()

	const handleSwitch = () => {
		if (typeof onToggle !== 'undefined') {
			onToggle()
		}
		setIsOn(!isOn)
	}
	return (
		<div
			className={sliderSwitch.switch}
			style={{ background: isOn ? theme.highlight : theme.mid }}
			onClick={handleSwitch}
		>
			<div
				className={sliderSwitch.slider}
				style={{
					transform: isOn ? 'translateX(24px)' : 'translateX(0)',
					background: theme.mid
				}}
			/>
		</div>
	)
}
