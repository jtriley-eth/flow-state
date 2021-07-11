import { AccountActionTypes, SET_FLOWS, SET_EVENTS } from './types'
import { Flow, Event } from '../../types'
import { Dispatch } from 'redux'

function _getFlows(address: string): Flow[] {
    //graphql query
    return []
}

function _getEvents(address: string): Event[] {
    //graphql query
    return []
}

export function setFlows(address: string) {
    return ((dispatch: Dispatch<AccountActionTypes>) => {
        dispatch({ type: SET_FLOWS, payload: _getFlows(address)})
    })
}

export function setEvents(address: string) {
    return ((dispatch: Dispatch<AccountActionTypes>) => {
        dispatch({ type: SET_EVENTS, payload: _getEvents(address)})
    })
}