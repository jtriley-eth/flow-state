import React from 'react'
import AnimationCanvas from './helpers/AnimationCanvas'
import Chart from './helpers/Chart'
import Flows from './helpers/Flows'
import History from './helpers/History'
import '../styles/Main.css'

const Main = props => {
    const { account, getAddress } = props

    if (!account) {
        return (
            <div className='main auth'>
                <div className='animate'>
                    <AnimationCanvas/>
                </div>
                <div className='card auth-card'>
                    <div className='card-header'>
                        <h2>Connect Wallet</h2>
                    </div>
                    <div
                        className='card metamask'
                        onClick={() => getAddress()}
                    >
                        <h3>MetaMask</h3>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='main'>
            <section className='main-section top'>
                <div className='card main-card'>
                    <Chart />
                </div>
                <div className='card main-card'>
                    <Flows />
                </div>
            </section>
            <section className='main-section'>
                <div className='card main-card'>
                    <History />
                </div>
            </section>
        </div>
    )
}

export default Main