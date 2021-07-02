import * as ActionTypes from './ActionTypes'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { superfluidGoerliUrl } from '../constants/thegraph'
// import SuperfluidSDK from '@superfluid-finance/js-sdk'
// import { Web3Provider } from '@ethersproject/providers'

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
                    underlyingAddress
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
                    underlyingAddress
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
                    underlyingAddress
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
                    underlyingAddress
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
            upgradeEvents {
                amount
                transaction {
                    timestamp
                }
                token {
                    name
                    symbol
                    underlyingAddress
                }
            }
            downgradeEvents {
                amount
                transaction {
                    timestamp
                }
                token {
                    name
                    symbol
                    underlyingAddress
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
                upgradeEvents,
                downgradeEvents
            } = data.data.account

            let events = []

            flowsOwned.forEach(flow => {
                const flowEvents = flow.events.map(event => {
                    let note = ''

                    if (event.oldFlowRate === '0') {
                        note = 'Stream Start'
                    } else if (event.newFlowRate === '0') {
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
                    } else if (event.newFlowRate === '0') {
                        note = 'Stream Stop'
                    } else {
                        note = 'Stream Update'
                    }

                    return {
                        type: 'flow',
                        sum: parseInt(event.sum),
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

            const upEvents = upgradeEvents.map(event => ({
                type: 'upgrade',
                amount: parseInt(event.amount),
                timestamp: parseInt(event.transaction.timestamp),
                token: event.token,
                note: 'Token Upgrade'
            }))
            events = events.concat(upEvents)

            const downEvents = downgradeEvents.map(event => ({
                type: 'downgrade',
                amount: parseInt(event.amount),
                timestamp: parseInt(event.transaction.timestamp),
                token: event.token,
                note: 'Token Downgrade'
            }))
            events = events.concat(downEvents)

            events.sort((a, b) => b.timestamp - a.timestamp)

            return events
        })
        .catch(error => {
            console.log(error)
            return []
        })
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

const setError = error => ({
    type: ActionTypes.SET_ERROR,
    payload: error
})