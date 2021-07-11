export type { UserState } from '../../types'

export const SET_ADDRESS = 'SET_ADDRESS'
export const SET_THEME = 'SET_THEME'

interface SetAddressAction {
    type: typeof SET_ADDRESS
    payload: string
}

interface SetThemeAction {
    type: typeof SET_THEME
}

export type UserActionTypes = SetAddressAction | SetThemeAction