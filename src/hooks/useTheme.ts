import * as theme from '../constants/theme.json'
import { useAppSelector } from './useRedux'

export function useTheme(reversed: boolean = false) {
	const { isDark } = useAppSelector(state => state.user)

	// xor(isDark, reversed)
	return isDark !== reversed
		? {
				text: theme.dark.text,
				error: theme.dark.error,
				base: theme.dark.base,
				low: theme.dark.low,
				mid: theme.dark.mid,
				high: theme.dark.high,
				veryHigh: theme.dark.veryHigh,
				primary: theme.dark.primary,
				secondary: theme.dark.secondary,
				ternary: theme.dark.ternary,
				highlight: theme.dark.highlight,
				divider: theme.dark.divider
		  }
		: {
				text: theme.light.text,
				error: theme.light.error,
				base: theme.light.base,
				low: theme.light.low,
				mid: theme.light.mid,
				high: theme.light.high,
				veryHigh: theme.light.veryHigh,
				primary: theme.light.primary,
				secondary: theme.light.secondary,
				ternary: theme.light.ternary,
				highlight: theme.light.highlight,
				divider: theme.dark.divider
		  }
}
