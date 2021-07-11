import { UserActionTypes, SET_ADDRESS, SET_THEME } from './types'
import { Dispatch } from 'redux'

async function _getAddress(): Promise<string[]> {
    const ethWindow = window as any
    if (typeof ethWindow.ethereum !== undefined) {
        return await ethWindow.ethereum.request({
            method: 'eth_requestAccounts'
        })
    } else {
        alert('You need a Web 3 Provider to perform this action')
        return []
    }
}

export function setAddress(address?: string) {
    return ((dispatch: Dispatch<UserActionTypes>) => {
        if (address) {
            dispatch({ type: SET_ADDRESS, payload: address })
        } else {
            _getAddress()
                .then((addresses: string[]) => {
                    if (addresses.length > 0) {
                        dispatch({ type: SET_ADDRESS, payload: addresses[0] })
                    }
                })
                .catch(error => console.log(error))
        }
    })
}

export function setTheme() {
    return ((dispatch: Dispatch<UserActionTypes>) => {
        dispatch({ type: SET_THEME })
    })
}