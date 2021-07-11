import * as theme from '../constants/theme.json'
import { useSelector } from 'react-redux'
import { RootState, ThemeParam } from '../types'

export function useTheme(item: ThemeParam) {
    const isDark = useSelector((state: RootState) => state.user.isDark)

    switch(item) {
        case 'text':
            return { color: isDark ? theme.dark.text : theme.light.text }
        case 'error':
            return { color: isDark ? theme.dark.error : theme.light.error }
        case 'base':
            return {
                backgroundColor: isDark ? theme.dark.base : theme.light.base
            }
        case 'low':
            return {
                backgroundColor: isDark ? theme.dark.low : theme.light.low
            }
        case 'mid':
            return {
                backgroundColor: isDark ? theme.dark.mid : theme.light.mid
            }
        
        case 'high':
            return {
                backgroundColor: isDark ? theme.dark.high : theme.light.high
            }
        case 'veryHigh':
            return {
                backgroundColor: isDark ? (
                    theme.dark.veryHigh
                ) : (
                    theme.light.veryHigh
                )
            }
    }
}