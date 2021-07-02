import * as ActionTypes from './ActionTypes'

const initialState = {
    account: '',
    flows: {
        outFlows: [],
        inFlows: []
    },
    events: []
}

export const user = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.SET_USER:
            return ({
                ...state,
                error: null,
                account: action.payload
            })
        
        case ActionTypes.GET_FLOWS:
            return ({
                ...state,
                error: null,
                flows: action.payload
            })

        case ActionTypes.GET_EVENTS:
            return ({
                ...state,
                error: null,
                events: action.payload
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