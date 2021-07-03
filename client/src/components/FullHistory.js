import React, { useState } from 'react'
import { connect } from 'react-redux'
import TimeMachine from './helpers/TimeMachine'
import { getTimestampBalance } from '../constants/timestuff'
import '../styles/FullHistory.css'

const FullHistory = props => {
    const { events, account } = props.user
    console.log(events)
    const [startTime, setStartTime] = useState(
        events.length > 0 ?
        events[0].timestamp
        :
        Math.floor(Date.now() / 1000) - 604800
    )
    const [endTime, setEndTime] = useState(Math.floor(Date.now() / 1000))
    const [tokenSymbol, setTokenSymbol] = useState('fDAIx')

    const relevantEvents = events.filter(event => {
        const { timestamp, token } = event
        return (
            timestamp >= startTime &&
            timestamp <= endTime &&
            token.symbol === tokenSymbol
        )
    })

    const formatTimestamp = timestamp => {
        return new Date(timestamp * 1000).toISOString().substring(0,19)
    }

    const timestampHandler = ISOString => {
        return Math.floor(new Date(ISOString).valueOf() / 1000)
    }

    const shortAddr = address => {
        const start = address.substring(0, 5)
        const end = address.substring(address.length - 5, address.length)
        return `${start}..${end}`
    }

    const getDate = timestamp => {
        const jsTimestamp = new Date(timestamp * 1000)
        return (
            `${jsTimestamp.getDate()}
            ${jsTimestamp.toLocaleString('default', { month: 'short' })},
            ${jsTimestamp.getFullYear()}`
        )
    }

    return (
        <div className='fullhistory'>
            <div className='fullhistory-header'>
                <h2 className='fullhistory-h2'>Full History</h2>
            </div>
            <div className='full-history-content'>
                    <TimeMachine
                        events={events}
                        startTime={startTime}
                        endTime={endTime}
                        tokenSymbol={tokenSymbol}
                    />
                <div className='card full-history-card'>
                    <div className='card-header'>
                        <h3>Time Machine</h3>
                    </div>
                    <div>
                        <div>
                            <p>Start Date-Time</p>
                            <input
                                className='input'
                                type='datetime-local'
                                value={formatTimestamp(startTime)}
                                onChange={e => {
                                    const ISOString = e.target.value
                                    setStartTime(timestampHandler(ISOString))
                                }}
                            />
                        </div>
                        <div>
                            <p>End Date-Time</p>
                            <input
                                className='input'
                                type='datetime-local'
                                value={formatTimestamp(endTime)}
                                onChange={e => {
                                    const ISOString = e.target.value
                                    setEndTime(timestampHandler(ISOString))
                                }}
                            />
                        </div>
                        <div>
                            <p>Token Symbol</p>
                            <input
                                className='input'
                                value={tokenSymbol}
                                onChange={e => setTokenSymbol(e.target.value)}
                            />
                        </div>
                        <div className='fullhistory-balances'>
                            <p className='fullhistory-balances-label'>Starting Balance:</p>
                            <p>{getTimestampBalance(events, startTime, tokenSymbol, account)}</p>
                            <p className='fullhistory-balances-label'>End Balance:</p>
                            <p>{getTimestampBalance(events, endTime, tokenSymbol, account)}</p>
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
                            relevantEvents.length > 0 ?
                            relevantEvents.map((event, index) => {
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

const mapStateToProps = state => ({ user: state.user})

export default connect(mapStateToProps, null)(FullHistory)