import * as ActionTypes from './ActionTypes'

const initialState = {
    account: ''
}

export const user = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.SET_USER:
            return ({
                ...state,
                error: null,
                account: action.payload
            })
        case ActionTypes.SET_ERROR:
            return ({
                ...state,
                error: action.payload
            })
        default: 
            return state
    }
}