import { Flow, Event } from '../../types'

export type { AccountState } from '../../types'

export const SET_FLOWS = 'SET_FLOWS'
export const SET_EVENTS = 'SET_EVENTS'

interface SetFlowsAction {
    type: typeof SET_FLOWS
    payload: Flow[]
}

interface SetEventsAction {
    type: typeof SET_EVENTS
    payload: Event[]
}

export type AccountActionTypes = SetFlowsAction | SetEventsAction