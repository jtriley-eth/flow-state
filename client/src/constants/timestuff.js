export const getLastUpdate = flows => {
    let lastUpdate = 0
    flows.inFlows.forEach(flow => lastUpdate = Math.max(flow.lastUpdate, lastUpdate))
    flows.outFlows.forEach(flow => lastUpdate = Math.max(flow.lastUpdate, lastUpdate))
    return lastUpdate
}

export const getNetFlowRate = flows => {
    let netFlowRate = 0
    flows.inFlows.forEach(flow => netFlowRate += parseInt(flow.flowRate))
    flows.outFlows.forEach(flow => netFlowRate -= parseInt(flow.flowRate))
    return netFlowRate
}

export const getChartData = (
    events,
    startTime,
    endTime,
    tokenSymbol,
    account
) => {
    let chartData = []

    chartData.push({
        label: startTime.toString(),
        balance: getTimestampBalance(events, startTime, tokenSymbol, account)
    })
    const interval = (endTime - startTime) / 18
    for (let iterator = 1; iterator < 19; iterator++) {
        const intervalTimestamp = (interval * iterator) + startTime
        chartData.push({
            label: intervalTimestamp.toString(),
            balance: getTimestampBalance(
                events,
                intervalTimestamp,
                tokenSymbol,
                account
            )
        })
    }

    chartData.push({
        label: endTime.toString(),
        balance: getTimestampBalance(events, endTime, tokenSymbol, account)
    })
    return chartData
}

export const getTimestampBalance = (
    events,
    snapshotTimestamp,
    tokenSymbol,
    account,
    decimals=1e-18
) => {
    let balance = 0
    let flows = []
    
    // Spaghetti Code of The Century :)
    events.forEach(event => {

        // MUST match token symbol
        if (event.token.symbol === tokenSymbol) {

            // Calculate Starting Balance
            if (event.timestamp < snapshotTimestamp) {

                if (event.note === 'Transfer Received') {
                    balance += event.amount

                } else if (event.note === 'Transfer Sent') {
                    balance -= event.amount

                } else if (event.note === 'Stream Start') {
                    const index = flows.findIndex(flow => {
                        return (
                            flow.sender === event.sender &&
                            flow.receiver === event.receiver
                        )
                    })
                    if (index === -1) {
                        flows.push({
                            flowRate: event.newFlowRate,
                            receiver: event.receiver,
                            sender: event.sender,
                            active: true,
                            timestamp: event.timestamp
                        })
                    } else {
                        flows[index].active = true
                        flows[index].timestamp = event.timestamp
                        flows[index].flowRate = event.newFlowRate
                    }

                } else if (event.note === 'Stream Stop') {
                    const index = flows.findIndex(flow => {
                        return (
                            flow.sender === event.sender &&
                            flow.receiver === event.receiver &&
                            flow.flowRate === event.oldFlowRate
                        )
                    })
                    const intermediateSum = (flows[index].timestamp - event.timestamp) * event.oldFlowRate

                    if (account === event.sender) {
                        balance -= (intermediateSum)
                    } else {
                        balance += (intermediateSum)
                    }

                    flows[index].active = false

                } else if (event.note === 'Stream Update') {
                    const index = flows.findIndex(flow => {
                        return (
                            flow.flowRate === event.oldFlowRate &&
                            flow.sender === event.sender &&
                            flow.receiver === event.receiver
                        )
                    })
                    if (typeof flows[index] !== 'undefined') {
                        if (account === event.sender) {
                            balance -= (event.sum - flows[index].sumRecorded)
                        } else {
                            balance += (event.sum - flows[index].sumRecorded)
                        }
                        flows[index].sumRecorded += event.sum
                    }
                }
            }
        }
    })

    if (flows.length !== 0) {
        flows.forEach(flow => {
            if (flow.active) {
                const balanceChange = ((snapshotTimestamp - flow.timestamp) * flow.flowRate)
                if (flow.receiver === account) {
                    balance += balanceChange
                } else if (flow.sender === account) {
                    balance -= balanceChange
                }
            }
        })
    }
    return balance * decimals
}