import React from 'react'
import AnimationCanvas from './helpers/AnimationCanvas'
import '../styles/Main.css'

const Main = props => {
    const { account, getAddress } = props

    if (!account) {
        return (
            <div className='main'>
                <div className='animate'>
                    <AnimationCanvas/>
                </div>
                <div className='card auth'>
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
            <section className='main-section'>
                <div className='card main-card'>
                    <div className='card-header'>
                        <h2>Card</h2>
                    </div>
                    <p>card data ...</p>
                </div>
            </section>
        </div>
    )
}

export default Main