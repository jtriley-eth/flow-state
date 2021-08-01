# Flow State Docs

This will be more populated as packages release. This is for notes for now.

## The Graph

Flow State Query 1.0

```typescript
interface QueryData {
	account: {
		flowsOwned: Array<{
			id: string
			sum: string
			flowRate: string
			lastUpdate: string
			token: {
				id: string
				symbol: string
				name: string
			}
			owner: {
				id: string
			}
			recipient: {
				id: string
			}
			events: Array<{
				id: string
				oldFlowRate: string
				flowRate: string
				transaction: {
					timestamp: string
				}
			}>
		}>
		flowsReceived: Array<{
			id: string
			sum: string
			flowRate: string
			lastUpdate: string
			token: {
				id: string
				symbol: string
				name: string
			}
			owner: {
				id: string
			}
			recipient: {
				id: string
			}
			events: Array<{
				id: string
				oldFlowRate: string
				flowRate: string
				transaction: {
					timestamp: string
				}
			}>
		}>
		accountWithTokens: Array<{
			token: QueryToken
			transferEventsReceived: Array<{
				id: string
				transaction: {
					timestamp: string
				}
				value: string
				from: {
					id: string
				}
				token: {
					id: string
					symbol: string
					name: string
				}
			}>
			transferEventsSent: Array<{
				id: string
				transaction: {
					timestamp: string
				}
				value: string
				from: {
					id: string
				}
				token: {
					id: string
					symbol: string
					name: string
				}
			}>
		}>
	}
}

interface AccountData {
	flows: Array<{
		outFlows: Array<{
			id: string
			flowRate: number
			lastUpdate: number
			token: {
				id: string
				name: string
				symbol: string
			}
			owner: string
			recipient: string
			sum: number
		}>
		inFlows: Array<{
			id: string
			flowRate: number
			lastUpdate: number
			token: {
				id: string
				name: string
				symbol: string
			}
			owner: string
			recipient: string
			sum: number
		}>
	}>
}

const address = '0x00'
const query = `
query {
    account(id: "${address}") {
        flowsOwned (
            orderBy: lastUpdate
            orderDirection: desc
        ) {
            id
            sum
            flowRate
            lastUpdate
            token {
                id
                name
                symbol
            }
            owner {
                id
            }
            recipient {
                id
            }
            events {
                id
                oldFlowRate
                flowRate
                transaction {
                    timestamp
                }
            }
        }
        flowsReceived (
            orderBy: lastUpdate
            orderDirection: desc
        ) {
            id
            sum
            flowRate
            lastUpdate
            token {
                id
                name
                symbol
            }
            owner {
                id
            }
            recipient {
                id
            }
            events {
                id
                oldFlowRate
                flowRate
                transaction {
                    timestamp
                }
            }
        }
        accountWithTokens {
            transferEventsReceived {
                id
                transaction {
                    timestamp
                }
                value
                from {
                    id
                }
                token {
                    id
                    name
                    symbol
                }
            }
            transferEventsSent {
                id
                transaction {
                    timestamp
                }
                value
                to {
                    id
                }
                token {
                    id
                    name
                    symbol
                }
            }
        }
    }
}
`
```

Flow State Query 2.0

```typescript
type QueryAccountTokens = Array<{
	token: {
		id: string
		name: string
		symbol: string
	}
	inTransfers: {
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
	outTransfers: {
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
	flows: {
		outFlows: Array<{
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
			events: {
				id: string
				transaction: {
					timestamp: string
				}
				oldFlowRate: string
				flowRate: string
				sum: string
			}
		}>
		inFlows: Array<{
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
			events: {
				id: string
				transaction: {
					timestamp: string
				}
				oldFlowRate: string
				flowRate: string
				sum: string
			}
		}>
	}
}>

type AccountTokens = Array<{
	id: string
	name: string
	symbol: string
	events: Array<
		| {
				id: string
				timestamp: number
				from: string
				to: string
				value: string
		  }
		| {
				id: string
				timestamp: string
				oldFlowRate: string
				flowRate: string
				sum: string
				to: string
				from: string
		  }
	>
	flows: Array<{
		id: string
		sum: string
		flowRate: string
		lastUpdate: number
		sender: string
		recipient: string
	}>
}>

const address = '0x00'
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
```
