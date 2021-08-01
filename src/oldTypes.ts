export type ThemeParam =
	| 'text'
	| 'error'
	| 'base'
	| 'low'
	| 'mid'
	| 'high'
	| 'veryHigh'

export type ChainName =
	| 'xdai'
	| 'matic'
	| 'mumbai'
	| 'goerli'
	| 'ropsten'
	| 'kovan'
	| 'rinkeby'
	| 'unknown'

export type EventType = 'inflow' | 'outflow' | 'received' | 'sent'

export type EventNote =
	| 'stream start'
	| 'stream stop'
	| 'stream update'
	| 'transfer sent'
	| 'transfer received'
	| 'unknown'

export type Token = {
	id: string
	name: string
	symbol: string
}

export type TransferEvent = {
	id: string
	amount: number
	timestamp: number
	token: Token
	sender: string
	recipient: string
	note: EventNote
	type: EventType
}

export type FlowEvent = {
	id: string
	sum: number
	oldFlowRate: number
	newFlowRate: number
	token: Token
	sender: string
	recipient: string
	timestamp: number
	note: EventNote
	type: EventType
}

export type AccountEvent = TransferEvent | FlowEvent

export type Flow = {
	id: string
	flowRate: number
	lastUpdate: number
	token: Token
	owner: string
	recipient: string
	sum: number
}

export type AccountFlows = {
	outFlows: Flow[]
	inFlows: Flow[]
}

export type AccountData = {
	flows: AccountFlows
	events: AccountEvent[]
}

export interface UserState {
	address: string
	isDark: boolean
	chain: ChainName
	accountData: AccountData
}

export type ChartData = Array<{
	label: string
	balance: number
}>

// type guards

export function isTransferEvent(event: AccountEvent): event is TransferEvent {
	return event.type === 'received' || event.type === 'sent'
}

export function isFlowEvent(event: AccountEvent): event is FlowEvent {
	return event.type === 'inflow' || event.type === 'outflow'
}
