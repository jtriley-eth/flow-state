import React from 'react'
import { connect } from 'react-redux'
import { getTimestampBalance, getNetFlowRate } from '../../constants/timestuff'
import BalanceVisual from './BalanceVisual'
import '../../styles/helpers/Sidebar.css'

const Sidebar = props => {
    const { showMenu, user } = props
    const now = Math.floor(Date.now() / 1000)
    const netFlowRate = getNetFlowRate(user.flows)
    const balance = getTimestampBalance(
        user.events,
        now,
        'fDAIx',
        user.account,
        10
    )
    
    return (
        <div
            className='sidebar'
            style={{
                width: showMenu ? 450 : 0
            }}
        >
            <div className='sidebar-header'>
                <h2 className='sidebar-h2'>Account</h2>
            </div>
            <div className='sidebar-group'>
                <p>Address</p>
                <p className='sidebar-highlight'>{user.account}</p>
            </div>
            <div className='sidebar-group'>
                <p>Balance</p>
                <p>
                    <BalanceVisual
                        balance={balance}
                        netFlowRate={netFlowRate}
                        timestamp={now}
                        className='sidebar-highlight'
                    /> fDAIx
                </p>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps, null)(Sidebar)