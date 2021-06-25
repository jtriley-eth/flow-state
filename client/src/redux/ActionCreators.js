import * as ActionTypes from './ActionTypes'
import SuperfluidSDK from '@superfluid-finance/js-sdk'
import { Web3Provider } from '@ethersproject/providers'

const fDAIx = '0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00'

const _getAddress = async () => {
    if (typeof window.ethereum !== 'undefined') {
        return await window.ethereum.request({
            method: 'eth_requestAccounts'
        })
    } else {
        return 'Error: You need a web 3.0 provider to perform this action'
    }
}

const _getFlowDetails = async (sf, flow) => {
    const { flowRate, receiver, sender } = flow
    const details = await sf.cfa.getFlow({
        superToken: fDAIx,
        receiver: receiver,
        sender: sender
    })
    return ({
        flowRate,
        receiver,
        sender,
        timestamp: details.timestamp.getTime() / 1000,
        deposit: details.deposit
    })
}

const _getFlows = async address => {
    // replace with TheGraph query later!
    const sf = new SuperfluidSDK.Framework({
        ethers: new Web3Provider(window.ethereum)
    })
    await sf.initialize()
    const user = sf.user({
        address: address,
        token: fDAIx
    })
    const details = await user.details()
    const { flows } = details.cfa

    const outFlows = Promise.all(flows.outFlows.map(async flow => {
        _getFlowDetails(sf, flow).then(result => result)
    }))
    const inFlows = Promise.all(flows.inFlows.map(async flow => {
        await _getFlowDetails(sf, flow).then(result => result)
    }))
    const flowDetails = {
        outFlows: outFlows,
        inFlows: inFlows
    }
    return flowDetails
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
        if (account.startsWith('Error: ')) {
            dispatch(setError(account))
        } else {
            dispatch(setUser(account))
        }
    })
}

export const getFlows = address => dispatch => {
    _getFlows(address).then(flows => {
        console.log(flows)
        dispatch(setFlows(flows))
    })
}

export const setNewFlow = (sender, recipient, flowRate) => dispatch => {
    _newFlow(sender, recipient, flowRate).then(flow => dispatch(addFlow(flow)))
}

const setUser = account => ({
    type: ActionTypes.SET_USER,
    payload: account
})

const addFlow = flow => ({
    type: ActionTypes.ADD_FLOW,
    payload: flow
})

const setFlows = flows => ({
    type: ActionTypes.GET_FLOWS,
    payload: flows
})

const setError = error => ({
    type: ActionTypes.SET_ERROR,
    payload: error
})