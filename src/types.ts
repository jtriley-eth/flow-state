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

export interface TransferEvent {
	id: string
	timestamp: number
	sender: string
	recipient: string
	value: string
	type: 'transfer'
}

export interface FlowEvent {
	id: string
	timestamp: number
	sender: string
	recipient: string
	oldFlowRate: string
	flowRate: string
	sum: string
	type: 'flow'
}

export type TokenEvent = TransferEvent | FlowEvent

export interface Flow {
	id: string
	sum: string
	flowRate: string
	lastUpdate: number
	sender: string
	recipient: string
}

export interface AccountToken {
	id: string
	name: string
	symbol: string
	events: Array<TokenEvent>
	flows: Array<Flow>
}

export interface UserState {
	address: string
	chain: ChainName
	isDark: boolean
	tokens: Array<AccountToken>
}

// type guards
export function isTransferEvent(event: TokenEvent): event is TransferEvent {
	return event.type === 'transfer'
}

export function isFlowEvent(event: TokenEvent): event is FlowEvent {
	return event.type === 'flow'
}
