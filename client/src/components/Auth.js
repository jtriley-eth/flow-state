import React from 'react'
import { connect } from 'react-redux'
import { getUser } from '../redux/ActionCreators'
import AnimationCanvas from './helpers/AnimationCanvas'
import '../styles/Auth.css'

const Auth = props => {
    const { getUser } = props
    return (
        <div className='main auth'>
            <div className='animate'>
                <AnimationCanvas/>
            </div>
            <div className='card auth-card'>
                <div className='card-header'>
                    <h2>Flow State</h2>
                </div>
                <p className='auth-p'>A Superfluid Flow Management Dashboard.</p>
                <p className='auth-p'>Connect a wallet to continue.</p>
                <div className='connect-wallet'>
                    <div className='supported-wallet' onClick={() => getUser()}>
                        <h4 className='supported-wallet-h2'>Metamask</h4>
                    </div>
                </div>
            </div>
            <div/>
        </div>
    )
}

const mapDispatchToProps = { getUser }

export default connect(null, mapDispatchToProps)(Auth)