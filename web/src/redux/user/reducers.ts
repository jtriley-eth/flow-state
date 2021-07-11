import {
    UserState,
    UserActionTypes,
    SET_ADDRESS,
    SET_THEME
} from './types'

const initialState: UserState = {
    address: '',
    isDark: true
}

export const user = (state = initialState, action: UserActionTypes) => {
    switch (action.type) {
        case SET_ADDRESS:
            return Object.assign({}, state, { address: action.payload })
        
        case SET_THEME:
            return Object.assign({}, state, { isDark: !state.isDark })
        default:
            return state
    }
}
