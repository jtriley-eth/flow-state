import {
    AccountState,
    AccountActionTypes,
    SET_FLOWS,
    SET_EVENTS
} from './types'

const initialState: AccountState = {
    flows: {
        inFlows: [],
        outFlows: []
    },
    events: []
}

export const account = (state = initialState, action: AccountActionTypes) => {
    switch(action.type) {
        case SET_FLOWS:
            return Object.assign({}, state, { flows: action.payload })
        
        case SET_EVENTS:
            return Object.assign({}, state, { events: action.payload })
        
        default:
            return state
    }
}