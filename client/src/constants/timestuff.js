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
    for (let iterator = 0; iterator < 18; iterator++) {
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
    let activeFlows = []

    // Spaghetti Code of The Century :)
    events.forEach(event => {
        const { timestamp, note } = event

        // MUST match token symbol
        if (event.token.symbol === tokenSymbol) {

            // Calculate Starting Balance
            if (timestamp < snapshotTimestamp) {

                if (note === 'Transfer Received') {
                    balance += event.amount

                } else if (note === 'Transfer Sent') {
                    balance -= event.amount

                } else if (note === 'Stream Start') {
                    activeFlows.push({
                        flowRate: event.newFlowRate,
                        receiver: event.receiver,
                        sender: event.sender,
                        sumRecorded: 0,
                        timestamp
                    })

                } else if (note === 'Stream Stop') {
                    activeFlows = activeFlows.filter(flow => {
                        return !(
                            flow.flowRate === event.oldFlowRate &&
                            flow.sender === event.sender &&
                            flow.receiver === event.receiver
                        )
                    })

                    if (account === event.sender) {
                        balance -= event.sum
                    } else {
                        balance += event.sum
                    }

                } else if (note === 'Stream Update') {
                    const index = activeFlows.findIndex(flow => {
                        return (
                            flow.flowRate === event.oldFlowRate &&
                            flow.sender === event.sender &&
                            flow.receiver === event.receiver
                        )
                    })
                    if (typeof activeFlows[index] !== 'undefined') {
                        if (account === event.sender) {
                            balance -= (event.sum - activeFlows[index].sumRecorded)
                            activeFlows[index].sumRecorded += event.sum
                        } else {
                            balance += (event.sum - activeFlows[index].sumRecorded)
                            activeFlows[index].sumRecorded += event.sum
                        }
                    }

                }
            }
        }
    })

    if (activeFlows.length !== 0) {
        activeFlows.forEach(flow => {
            const balanceChange = ((snapshotTimestamp - flow.timestamp) * flow.flowRate)
            if (flow.receiver === account) {
                balance += balanceChange
            } else if (flow.sender === account) {
                balance -= balanceChange
            }
        })
    }
    return balance * decimals
}