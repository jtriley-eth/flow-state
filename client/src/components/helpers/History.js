import React from 'react'
import '../../styles/helpers/History.css'
// import Loader from './Loader'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const History = props => {
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
        <div className='history'>
            <div className='history-header'>
                <h2>History</h2>
                <Link
                    className='history-link'
                    to='/history'
                >
                    Full History
                </Link>
            </div>
            <div>
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
                            events ?
                            events.slice(0, 5).map((event, index) => {
                                const isFlow = event.type === 'flow'
                                const isUpgrade = event.type === 'upgrade'
                                const isReceived = event.type === 'received'
                                const chartAmount =
                                    isFlow ?
                                    '-'
                                    :
                                    (isUpgrade || isReceived ? event.amount * 1e-18 : `-${event.amount * 1e-18}`)
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
                                            {isFlow ? event.oldFlowRate * 1e-18 : '-'}
                                        </td>
                                        <td className='td flow-td'>
                                            {isFlow ? event.newFlowRate * 1e-18 : '-'}
                                        </td>
                                        <td className='td grade-td'>
                                            {chartAmount}
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

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps, null)(History)