import * as ActionTypes from './ActionTypes'
import SuperfluidSDK from '@superfluid-finance/js-sdk'
import { Web3Provider } from '@ethersproject/providers'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { superfluidGoerliUrl, fDAIx } from '../constants/thegraph'

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
            flowsOwned (orderBy: lastUpdate) {
                id
                sum
                flowRate
                lastUpdate
                token { name }
                owner { id }
                recipient { id }
            }
            flowsReceived (orderBy: lastUpdate) {
                id
                sum
                flowRate
                lastUpdate
                token { name }
                owner { id }
                recipient { id }
            }
        }
    }
    `
    const client = new ApolloClient({
        uri: superfluidGoerliUrl,
        cache: new InMemoryCache()
    })
    const flows = client.query ({ query: gql(query) })
        .then(data => {
            const { flowsOwned, flowsReceived } = data.data.account
            return ({
                inFlows: flowsReceived,
                outFlows: flowsOwned
            })
        })
        .catch(error => console.log(error))
    return flows
}

const _newFlow = async (sender, recipient, flowRate) => {
    // superfluid logic
    const sf = new SuperfluidSDK.Framework({
        ethers: new Web3Provider(window.ethereum)
    })
    await sf.initialize()
    const user = sf.user({
        address: sender,
        token: fDAIx
    })
    await user.flow({
        recipient: recipient,
        flowRate: flowRate
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

export const getFlows = address => dispatch => {
    _getFlows(address).then(flows => {
        dispatch({type: ActionTypes.GET_FLOWS, payload: flows })
    })
}

export const setNewFlow = (sender, recipient, flowRate) => dispatch => {
    _newFlow(sender, recipient, flowRate)
        .then(flow => dispatch({ type: ActionTypes.ADD_FLOW, payload: flow }))
}

const setError = error => ({
    type: ActionTypes.SET_ERROR,
    payload: error
})