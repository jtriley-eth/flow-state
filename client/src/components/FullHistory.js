import React from 'react'
import { connect } from 'react-redux'
import TimeMachine from './helpers/TimeMachine'
import '../styles/FullHistory.css'

const FullHistory = props => {
    const { events } = props.user

    const shortAddr = address => {
        const start = address.substring(0, 5)
        const end = address.substring(address.length - 5, address.length)
        return `${start}..${end}`
    }

    const getDate = timestamp => {
        const jsTimestamp = new Date(timestamp * 1000)
        return (
            `${jsTimestamp.getDate()} ${jsTimestamp.toLocaleString('default', { month: 'short' })}, ${jsTimestamp.getFullYear()}`
        )
    }

    return (
        <div className='fullhistory'>
            <div className='fullhistory-header'>
                <h2 className='fullhistory-h2'>Full History</h2>
            </div>
            <div className='full-history-content'>
                    <TimeMachine events={events} />
                <div className='card full-history-card'>
                    <div className='card-header'>
                        <h3>Time Machine</h3>
                    </div>
                    <div>
                        <div>
                            <p>Start Timestamp</p>
                            <input className='input' />

                        </div>
                        <div>
                            <p>End Timestamp</p>
                            <input className='input' />
                        </div>

                    </div>
                </div>
            </div>
            <div className='fullhistory-table-wrapper'>
                <table className='table'>
                    <thead>
                        <tr className='thead-r'>
                            <th className='th'>Timestamp</th>
                            <th className='th'>Token</th>
                            <th className='th'>Note</th>
                            <th className='th table-flow-event'>Sender</th>
                            <th className='th table-flow-event'>Receiver</th>
                            <th className='th table-flow-event'>Old Flow</th>
                            <th className='th table-flow-event'>New Flow</th>
                            <th className='th table-grade-event'>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            events.length > 0 ?
                            events.map((event, index) => {
                                const isFlow = event.type === 'flow'
                                const isUpgrade = event.type === 'upgrade'
                                return (
                                    <tr key={index.toString()} className='tbody-r'>
                                        <td className='td'>
                                            {getDate(event.timestamp)}
                                        </td>
                                        <td className='td'>
                                            {event.token.symbol}
                                        </td>
                                        <td className='td'>
                                            {event.note}
                                        </td>
                                        <td className='td flow-td'>
                                            {isFlow ? shortAddr(event.sender) : '-'}
                                        </td>
                                        <td className='td flow-td'>
                                            {isFlow ? shortAddr(event.receiver) : '-'}
                                        </td>
                                        <td className='td flow-td'>
                                            {isFlow ? event.oldFlowRate * 10e-18 : '-'}
                                        </td>
                                        <td className='td flow-td'>
                                            {isFlow ? event.newFlowRate * 10e-18 : '-'}
                                        </td>
                                        <td className='td grade-td'>
                                            {isFlow ? '-' : (isUpgrade ? event.amount * 10e-18 : `-${event.amount}`)}
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <tr className='tbody-r'>
                                <td className='td'>-</td>
                                <td className='td'>-</td>
                                <td className='td'>-</td>
                                <td className='td flow-td'>-</td>
                                <td className='td flow-td'>-</td>
                                <td className='td flow-td'>-</td>
                                <td className='td flow-td'>-</td>
                                <td className='td grade-td'>-</td>
                            </tr>
                            
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({ user: state.user})

export default connect(mapStateToProps, null)(FullHistory)