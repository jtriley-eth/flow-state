import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { subgraphUrl } from '../constants/url'
import type {
	ChainName,
	AccountToken,
	Flow,
	TransferEvent,
	FlowEvent,
	TokenEvent
} from '../types'

interface QueryToken {
	id: string
	name: string
	symbol: string
}

interface QueryTransfer {
	id: string
	transaction: {
		timestamp: string
	}
	to: {
		account: {
			id: string
		}
	}
	from: {
		account: {
			id: string
		}
	}
	value: string
}

interface QueryFlowEvent {
	id: string
	transaction: {
		timestamp: string
	}
	oldFlowRate: string
	flowRate: string
	sum: string
}

interface QueryFlow {
	id: string
	sum: string
	flowRate: string
	lastUpdate: string
	owner: {
		id: string
	}
	recipient: {
		id: string
	}
	events: Array<QueryFlowEvent>
}

interface QueryAccountToken {
	token: QueryToken
	inTransfers: Array<QueryTransfer>
	outTransfers: Array<QueryTransfer>
	flows: {
		inFlows: Array<QueryFlow>
		outFlows: Array<QueryFlow>
	}
}

export const getAddressWeb3 = async (): Promise<string> => {
	const ethWindow = window as any
	if (typeof ethWindow.ethereum !== 'undefined') {
		const addresses = await ethWindow.ethereum.request({
			method: 'eth_requestAccounts'
		})
		if (addresses.length > 0) {
			return addresses[0]
		} else {
			return ''
		}
	} else {
		alert('Error: You need a Web 3 provider to perform this action')
		return ''
	}
}

export const getChainNameWeb3 = async (): Promise<ChainName> => {
	const ethWindow = window as any
	if (typeof ethWindow.ethereum !== 'undefined') {
		const id = await ethWindow.ethereum.request({
			method: 'eth_chainId'
		})
		switch (id) {
			case '0x1':
				return 'unknown'
			case '0x100':
				return 'xdai'
			case '0x137':
				return 'matic'
			case '0x80001':
				return 'mumbai'
			case '0x3':
				return 'ropsten'
			case '0x4':
				return 'rinkeby'
			case '0x5':
				return 'goerli'
			case '0x2a':
				return 'kovan'
			default:
				return 'unknown'
		}
	} else {
		alert('Error: You need a Web 3 provider to perform this action')
		return 'unknown'
	}
}

export const getAccountTokensAsync = async (
	address: string,
	name: ChainName
): Promise<Array<AccountToken>> => {
	const query = `
	query {
		accountTokens: accountWithTokens(
			where: {
				account: "${address}"
			}
		) {
			token {
				id
				name
				symbol
			}
			inTransfers: transferEventsReceived {
				id
				transaction {
					timestamp
				}
				to {
					account {
						id
					}
				}
				from {
					account {
						id
					}
				}
				value
			}
			outTransfers: transferEventsSent {
				id
				transaction {
					timestamp
				}
				to {
					account {
						id
					}
				}
				from {
					account {
						id
					}
				}
				value
			}
			flows: token {
				outFlows: flows(
					where: {
						owner: "${address}"
					}
				) {
					id
					sum
					flowRate
					lastUpdate
					owner {
						id
					}
					recipient {
						id
					}
					events {
						id
						transaction {
							timestamp
						}
						oldFlowRate
						flowRate
						sum
					}
				}
				inFlows: flows(
					where: {
						recipient: "${address}"
					}
				) {
					id
					sum
					flowRate
					lastUpdate
					owner {
						id
					}
					recipient {
						id
					}
					events {
						id
						transaction {
							timestamp
						}
						oldFlowRate
						flowRate
						sum
					}
				}
			}
		}
	}
	`

	const client = new ApolloClient({
		uri: subgraphUrl.concat(name),
		cache: new InMemoryCache()
	})

	return client.query({ query: gql(query) }).then(data => {
		const queryAccountTokens: Array<QueryAccountToken> =
			data.data.accountTokens
		console.log('queryAccountTokens: ', queryAccountTokens)

		const accountTokens = queryAccountTokens.map(
			(accountToken): AccountToken => {
				const { token, inTransfers, outTransfers } = accountToken
				const { id, name, symbol } = token
				// Destructured this way to prevent 'flows' naming collision
				const { inFlows, outFlows } = accountToken.flows
				const allFlows = inFlows.concat(outFlows)

				const flows = allFlows.map(
					(flow): Flow => ({
						id: flow.id,
						sum: flow.sum,
						flowRate: flow.flowRate,
						lastUpdate: parseInt(flow.lastUpdate),
						sender: flow.owner.id,
						recipient: flow.recipient.id
					})
				)

				const flowEvents = allFlows.reduce(
					(events: Array<TokenEvent>, flow) => {
						return events.concat(
							flow.events.map(
								(event): FlowEvent => ({
									id: event.id,
									timestamp: parseInt(
										event.transaction.timestamp
									),
									sender: flow.owner.id,
									recipient: flow.recipient.id,
									oldFlowRate: event.oldFlowRate,
									flowRate: event.flowRate,
									sum: event.sum,
									type: 'flow'
								})
							)
						)
					},
					[]
				)

				const transferEvents = inTransfers.concat(outTransfers).map(
					(transfer): TokenEvent => ({
						id: transfer.id,
						timestamp: parseInt(transfer.transaction.timestamp),
						sender: transfer.from.account.id,
						recipient: transfer.to.account.id,
						value: transfer.value,
						type: 'transfer'
					})
				)

				const events = flowEvents.concat(transferEvents)
				return { id, name, symbol, events, flows }
			}
		)
		console.log(accountTokens)
		return accountTokens
	})
}
