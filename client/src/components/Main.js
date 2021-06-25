import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getUser, getFlows } from '../redux/ActionCreators'
import AnimationCanvas from './helpers/AnimationCanvas'
import Chart from './helpers/Chart'
import Flows from './helpers/Flows'
import History from './helpers/History'
import '../styles/Main.css'

const Auth = ({ getUser }) => {
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

const Main = props => {
    const { user, getUser, getFlows } = props
    console.log(props)
    useEffect(() => {
        if (user.account !== '') {
            getFlows(user.account)
        }
    // eslint-disable-next-line
    }, [user])

    if (!user.account) {
        return <Auth getUser={getUser} />
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
            <section className='main-section bottom'>
                <div className='card main-card'>
                    <History />
                </div>
            </section>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user,
        flows: state.flows
    }
}

const mapDispatchToProps = { getUser, getFlows }

export default connect(mapStateToProps, mapDispatchToProps)(Main)