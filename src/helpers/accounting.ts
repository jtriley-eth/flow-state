// getLastUpdate, getNetFlowRate, getTimestampSnapshot, getChartData
import { Flow, AccountToken, isTransferEvent, isFlowEvent } from '../types'
import { BN } from 'bn.js'

type FlowUpdate = {
	sender: string
	recipient: string
	lastUpdate: number
}

export const getNetFlowRate = (address: string, flows: Array<Flow>) => {
	return flows.reduce((netFlow, flow) => {
		const flowRate = new BN(flow.flowRate)
		const netFlowBN = new BN(netFlow)
		return flow.sender === address
			? netFlowBN.sub(flowRate).toString()
			: netFlowBN.add(flowRate).toString()
	}, '0')
}

export const getTimestampBalance = (
	address: string,
	timestamp: number,
	token: AccountToken
) => {
	// remove events after timestamp
	const events = token.events.filter(event => event.timestamp < timestamp)

	let flowUpdates: Array<FlowUpdate> = []

	events.reduce((balance, event) => {
		const balanceBN = new BN(balance)
		const { sender, recipient, timestamp } = event

		if (isFlowEvent(event)) {
			// flow start
			if (event.oldFlowRate === '0') {
				flowUpdates.push({
					sender,
					recipient,
					lastUpdate: timestamp
				})
				return balance
			} else {
				const index = flowUpdates.findIndex(
					flowUpdate =>
						flowUpdate.sender === sender &&
						flowUpdate.recipient === recipient
				)
				const lastUpdateBN = new BN(flowUpdates[index].lastUpdate)
				const balanceUpdateBN = new BN(timestamp)
					.sub(lastUpdateBN)
					.mul(new BN(event.oldFlowRate))

				// flow stop
				if (event.flowRate === '0') {
					flowUpdates = flowUpdates.splice(index, 1)
					return balanceBN.add(balanceUpdateBN)
				}

				// flow update
				flowUpdates[index].lastUpdate = event.timestamp
			}
		} else {
			const valueBN = new BN(event.value)

			return sender === address
				? balanceBN.sub(valueBN).toString()
				: balanceBN.add(valueBN).toString()
		}
	}, '0')
}

/*
import { AccountEvent, AccountFlows, isFlowEvent, isTransferEvent, ChartData } from '../types'

type Info = {
    balance: number,
    flows: Array<{
        flowRate: number
        recipient: string
        sender: string
        active: boolean
        timestamp: number
        sumRecorded: number
    }>
}

export function getLastUpdate(flows: AccountFlows): number {
    const { inFlows, outFlows} = flows
    const allFlows = inFlows.concat(outFlows)
    return allFlows.reduce((lastUpdate: number, flow) => (
        Math.max(flow.lastUpdate, lastUpdate)
    ), 0)
}

export function getNetFlowRate(flows: AccountFlows): number {
    const { inFlows, outFlows} = flows
    const allFlows = inFlows.concat(outFlows)
    return allFlows.reduce((rate: number, flow) => rate + flow.flowRate, 0)
}

export function getTimestampSnapshot(
    events: Array<AccountEvent>,
    timestamp: number,
    tokenSymbol: string,
    account: string,
    decimals: number = 1e-18
): number {

    let { balance, flows } = events
        .filter((event: AccountEvent) => (
            event.token.symbol === tokenSymbol && event.timestamp < timestamp
        ))
        .reduce((info: Info, event: AccountEvent) => {
        if (isTransferEvent(event)) {
            if (event.note === 'transfer received') {
                info.balance += event.amount
            } else if (event.note === 'transfer sent') {
                info.balance += event.amount
            }
        } else if (isFlowEvent(event)) {
            let index: number
            switch(event.note) {
                case 'stream start':
                    index = info.flows.findIndex(flow => (
                        flow.sender === event.sender
                        && flow.recipient === event.recipient
                    ))
                    if (index === -1) {
                        info.flows.push({
                            flowRate: event.newFlowRate,
                            sender: event.sender,
                            recipient: event.recipient,
                            active: true,
                            timestamp: event.timestamp,
                            sumRecorded: 0
                        })
                    } else {
                        info.flows[index] = Object.assign(
                            {},
                            info.flows[index],
                            {
                                active: true,
                                timestamp: event.timestamp,
                                flowRate: event.newFlowRate
                            }
                        )
                    }
                    break
                
                case 'stream stop':
                    index = info.flows.findIndex(flow => (
                        flow.sender === event.sender
                        && flow.recipient === event.recipient
                        && flow.flowRate === event.oldFlowRate
                    ))
                    const intermediateSum =
                        (event.timestamp - info.flows[index].timestamp)
                        * event.oldFlowRate
                    
                    if (account === event.sender) {
                        info.balance -= intermediateSum
                    } else if (account === event.recipient) {
                        info.balance += intermediateSum
                    }
                    info.flows[index].active = false
                    break
                
                case 'stream update':
                    index = info.flows.findIndex(flow => (
                        flow.sender === event.sender
                        && flow.recipient === event.recipient
                        && flow.flowRate === event.oldFlowRate
                    ))
                    if (account === event.sender) {
                        info.balance += (event.sum - info.flows[index].sumRecorded)
                    } else if (account === event.recipient) {
                        info.balance += (event.sum - info.flows[index].sumRecorded)
                    }
                    info.flows[index].sumRecorded += event.sum
            }
        }

        return info
    }, { balance: 0, flows: [] })

    if (flows.length !== 0) {
        flows.forEach(flow => {
            if (flow.active) {
                const balanceChange = (timestamp - flow.timestamp)
                    * flow.flowRate
                if (flow.recipient === account) {
                    balance += balanceChange
                } else if (flow.sender === account) {
                    balance -= balanceChange
                }
            }
        })
    }

    return (balance * decimals)
}


export function getChartData(
    events: Array<AccountEvent>,
    start: number,
    end: number,
    tokenSymbol: string,
    account: string
): ChartData {
    console.log(events)

    let chartData: ChartData = []

    chartData.push({
        label: start.toString(),
        balance: getTimestampSnapshot(
            events,
            start,
            tokenSymbol,
            account
        )
    })

    events.forEach(event => {
        chartData.push({
            label: event.timestamp.toString(),
            balance: getTimestampSnapshot(
                events,
                event.timestamp,
                tokenSymbol,
                account
            )
        })
    })

    chartData.push({
        label: end.toString(),
        balance: getTimestampSnapshot(
            events,
            end,
            tokenSymbol,
            account
        )
    })

    return chartData
}
*/
