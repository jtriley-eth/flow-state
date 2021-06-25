import React from 'react'
import '../../styles/helpers/Chart.css'
import SuperfluidSDK from '@superfluid-finance/js-sdk'
import { Web3Provider } from '@ethersproject/providers'
const token = '0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00'
const account = '0xb47A9B6F062c33ED78630478dFf9056687F840f2'

const Chart = () => {

    const listHistory = async () => {
        const sf = new SuperfluidSDK.Framework({
            ethers: new Web3Provider(window.ethereum)
        })
        await sf.initialize()
        const data = await sf.user({
            address: account,
            token: token
        })

        console.log(data.details())
    }

    return (
        <h2>Chart</h2>
    )
}

export default Chart