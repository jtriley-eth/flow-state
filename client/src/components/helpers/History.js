import React from 'react'
import '../../styles/helpers/History.css'
// import Loader from './Loader'
import { connect } from 'react-redux'

const History = props => {
    const { events } = props.user

    const shortAddr = address => {
        const start = address.substring(0, 5)
        const end = address.substring(address.length - 5, address.length)
        return `${start}..${end}`
    }

    const getDate = timestamp => {
        const jsTimestamp = new Date(parseInt(timestamp) * 1000)
        return (
            `${jsTimestamp.getDate()} ${jsTimestamp.toLocaleString('default', { month: 'short' })}, ${jsTimestamp.getFullYear()}`
        )
    }

    return (
        <div
        style={{ overflow: 'scroll'}}
        >
            <h2>History</h2>
            <div>
                <table className='history-table'>
                    <thead className='history-thead'>
                        <tr className='history-thead-r'>
                            <th className='history-th'>Timestamp</th>
                            <th className='history-th'>Token</th>
                            <th className='history-th'>Type</th>
                            <th className='history-th flow-event'>Old Flow</th>
                            <th className='history-th flow-event'>New Flow</th>
                            <th className='history-th flow-event'>Sender</th>
                            <th className='history-th flow-event'>Receiver</th>
                            <th className='history-th grade-event'>Amount</th>
                        </tr>
                    </thead>
                    <tbody className='history-body'>
                        {
                            events ?
                            events.map(event => {
                                const isFlow = event.type === 'flow'
                                const isUpgrade = event.type === 'upgrade'
                                return (
                                    <tr className='history-tbody-r'>
                                        <td className='history-td'>
                                            {getDate(event.timestamp)}
                                        </td>
                                        <td className='history-td'>
                                            {event.token.symbol}
                                        </td>
                                        <td className='history-td'>
                                            {event.type}
                                        </td>
                                        <td className='history-td flow-td'>
                                            {isFlow ? event.oldFlowRate * 10e-18 : '-'}
                                        </td>
                                        <td className='history-td flow-td'>
                                            {isFlow ? event.newFlowRate * 10e-18 : '-'}
                                        </td>
                                        <td className='history-td flow-td'>
                                            {isFlow ? shortAddr(event.sender) : '-'}
                                        </td>
                                        <td className='history-td flow-td'>
                                            {isFlow ? shortAddr(event.receiver) : '-'}
                                        </td>
                                        <td className='history-td grade-td'>
                                            {isFlow ? '-' : (isUpgrade ? event.amount * 10e-18 : `-${event.amount}`)}
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <tr className='history-tbody-r'>
                                <td className='history-td'>
                                    timestamp
                                </td>
                                <td className='history-td'>token</td>
                                <td className='history-td'>type</td>
                                <td className='history-td flow-td'>oldFlowRate</td>
                                <td className='history-td flow-td'>newFlowRate</td>
                                <td className='history-td flow-td'>sender</td>
                                <td className='history-td flow-td'>receiver</td>
                                <td className='history-td grade-td'>amount</td>
                            </tr>
                            
                        }
                    </tbody>
                </table>
            </div>
        </div>

    )
}

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps, null)(History)