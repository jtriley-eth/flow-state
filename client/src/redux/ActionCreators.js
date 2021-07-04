import * as ActionTypes from './ActionTypes'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { superfluidGoerliUrl } from '../constants/thegraph'
import SuperfluidSDK from '@superfluid-finance/js-sdk'
import { Web3Provider } from '@ethersproject/providers'

const _getAddress = async () => {
    if (typeof window.ethereum !== 'undefined') {
        return await window.ethereum.request({
            method: 'eth_requestAccounts'
        })
    } else {
        alert('Error: You need a web 3.0 provider to perform this action')
    }
}

const _getFlows = async address => {
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
                    name
                    symbol
                }
                owner {
                    id
                }
                recipient {
                    id
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
                    name
                    symbol
                }
                owner {
                    id
                }
                recipient {
                    id
                }
            }
        }
    }
    `

    const client = new ApolloClient({
        uri: superfluidGoerliUrl,
        cache: new InMemoryCache()
    })

    return client.query({ query: gql(query) })
        .then(data => {
            const inFlows = data.data.account.flowsReceived
            const outFlows = data.data.account.flowsOwned
            return ({
                inFlows,
                outFlows
            })
        })
        .catch(error => {
            console.log(error)
            return ({ inFlows: [], outFlows: [] })
        })
}

const _getEvents = async address => {
    const query = `
    query {
        account(id: "${address}") {
            flowsOwned {
                sum
                token {
                    name
                    symbol
                }
                events {
                    oldFlowRate
                    flowRate
                    transaction {
                        timestamp
                    }
                }
                owner {
                    id
                }
                recipient {
                    id
                }
            }
            flowsReceived {
                sum
                token {
                    name
                    symbol
                }
                events {
                    oldFlowRate
                    flowRate
                    transaction {
                        timestamp
                    }
                }
                owner {
                    id
                }
                recipient {
                    id
                }
            }
            accountWithToken {
                token {
                    name
                    symbol
                }
                transferEventsReceived {
                    transaction {
                        timestamp
                    }
                    value
                }
                transferEventsSent {
                    transaction {
                        timestamp
                    }
                    value
                }
            }
        }
    }
    `

    const client = new ApolloClient({
        uri: superfluidGoerliUrl,
        cache: new InMemoryCache()
    })

    return client.query({ query: gql(query) })
        .then(data => {
            const {
                flowsOwned,
                flowsReceived,
                accountWithToken
            } = data.data.account

            let events = []

            flowsOwned.forEach(flow => {
                const flowEvents = flow.events.map(event => {
                    let note = ''

                    if (event.oldFlowRate === '0') {
                        note = 'Stream Start'
                    } else if (event.flowRate === '0') {
                        note = 'Stream Stop'
                    } else {
                        note = 'Stream Update'
                    }

                    return {
                        type: 'flow',
                        sum: parseInt(flow.sum),
                        timestamp: parseInt(event.transaction.timestamp),
                        oldFlowRate: parseInt(event.oldFlowRate),
                        newFlowRate: parseInt(event.flowRate),
                        token: flow.token,
                        sender: flow.owner.id,
                        receiver: flow.recipient.id,
                        note: note
                    }
                })
                events = events.concat(flowEvents)
            })

            flowsReceived.forEach(flow => {
                const flowEvents = flow.events.map(event => {
                    let note = ''

                    if (event.oldFlowRate === '0') {
                        note = 'Stream Start'
                    } else if (event.flowRate === '0') {
                        note = 'Stream Stop'
                    } else {
                        note = 'Stream Update'
                    }

                    return {
                        type: 'flow',
                        sum: parseInt(flow.sum),
                        timestamp: parseInt(event.transaction.timestamp),
                        oldFlowRate: parseInt(event.oldFlowRate),
                        newFlowRate: parseInt(event.flowRate),
                        token: flow.token,
                        sender: flow.owner.id,
                        receiver: flow.recipient.id,
                        note: note
                    }
                })
                events = events.concat(flowEvents)
            })

            accountWithToken.forEach(account => {
                const transfersSent = account.transferEventsSent.map(transfer => {
                    return ({
                        type: 'sent',
                        amount: parseInt(transfer.value),
                        timestamp: parseInt(transfer.transaction.timestamp),
                        token: account.token,
                        note: 'Transfer Sent'
                    })
                })
                events = events.concat(transfersSent)
                
                const transfersReceived = account.transferEventsReceived.map(transfer => {
                    return ({
                        type: 'received',
                        amount: parseInt(transfer.value),
                        timestamp: parseInt(transfer.transaction.timestamp),
                        token: account.token,
                        note: 'Transfer Received'
                    })
                })
                events = events.concat(transfersReceived)

            })

            events.sort((a, b) => a.timestamp - b.timestamp)
            return events
        })
        .catch(error => {
            console.log(error)
            return []
        })
}

const _createFlow = async (recipient, superTokenSymbol, superToken, flowRate) => {
    console.log('_createFlow')
    try {
        const flowRateString = (flowRate * 1e18).toString()
        const sf = new SuperfluidSDK.Framework({
            ethers: new Web3Provider(window.ethereum)
        })
        await sf.initialize()
    
        // ALWAYS request
        const walletAddress = await window.ethereum.request({
            method: 'eth_requestAccounts',
            params: [{ eth_accounts: {} }]
        })
    
        const user = sf.user({
            address: walletAddress[0],
            token: superToken
        })

        await user.flow({
            recipient,
            flowRate: flowRateString
        })
        console.log('returning')
        return ({
            flowRate: flowRateString,
            lastUpdate: Date.now().toString(),
            owner: {
                id: walletAddress[0]
            },
            recipient: {
                id: recipient
            },
            sum: '0',
            token: {
                symbol: superTokenSymbol
            }
        })

    } catch (error) {
        console.log(error)
        return null
    }
}

export const getUser = () => dispatch => {
    _getAddress().then(result => {
        const account = result[0]
        if (account) {
            dispatch({ type: ActionTypes.SET_USER, payload: account })
        } else {
            dispatch(setError('You need a web 3.0 provider to perform this action'))
        }
    })
}

export const setCustomUser = address => dispatch => {
    const account = address.toLowerCase()
    dispatch({ type: ActionTypes.SET_USER, payload: account })
}


export const getFlows = address => dispatch => {
    _getFlows(address).then(flows => {
        dispatch({type: ActionTypes.GET_FLOWS, payload: flows })
    })
}

export const getEvents = address => dispatch => {
    _getEvents(address).then(events => {
        dispatch({ type: ActionTypes.GET_EVENTS, payload: events })
    })
}

export const createFlow = (recipient, superTokenSymbol, superToken, flowRate) => dispatch => {
    console.log('createFlow')
    _createFlow(recipient, superTokenSymbol, superToken, flowRate).then(result => {
        if (result !== null) {
            console.log('result', result)
            dispatch({ type: ActionTypes.ADD_FLOW, payload: result })
        }
    })
}

const setError = error => ({
    type: ActionTypes.SET_ERROR,
    payload: error
})