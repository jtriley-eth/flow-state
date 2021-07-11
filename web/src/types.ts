export type EventNote = 'inflow' | 'outflow' | 'received' | 'sent'
export type ThemeParam = 'text' | 'error' | 'base' | 'low' | 'mid' | 'high' | 'veryHigh'

export type Token = {
    id: string
    name: string
    symbol: string
}

export type Event = {
    id: string
    amount: number
    timestamp: number
    token: Token
    note: EventNote
}

export type Flow = {
    id: string
    flowRate: number
    lastUpdate: number
    owner: string
    sender: string
    sum: number
}

export interface UserState {
    address: string
    isDark: boolean
}

export interface AccountState {
    flows: {
        outFlows: Flow[]
        inFlows: Flow[]
    }
    events: Event[]
}

export interface RootState {
    user: UserState
    account: AccountState
}
