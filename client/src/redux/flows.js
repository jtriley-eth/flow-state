import * as ActionTypes from './ActionTypes'

const initialState = {
    error: null,
    flows: {
        outFlows: [],
        inFlows: []
    }
}

export const flows = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.GET_FLOWS:
            return ({
                ...state,
                error: null,
                flows: action.payload
            })
        case ActionTypes.ADD_FLOW:
            const { flows } = state
            const updatedFlows = {
                outFlows: flows.outFlows.concat(action.payload),
                inFlows: flows.inFlows
            }
            return ({
                ...state,
                error: null,
                flows: updatedFlows
            })
        case ActionTypes.UPDATE_FLOW:
            return ({
                ...state,
                error: null,
                flows: action.payload
            })
        default:
            return state
    }
}