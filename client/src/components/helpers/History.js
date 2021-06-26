import React, { useMemo, useState } from 'react'
import '../../styles/helpers/History.css'
import Loader from './Loader'
import { connect } from 'react-redux'

const History = props => {
    const { flows } = props.flows
    const [history, setHistory] = useState()
    
    useMemo(() => {

        let fullHistory = []

        flows.inFlows.forEach(flow => {
            const events = flow.events.map(event => ({
                id: event.id,
                timestamp: parseInt(event.transaction.timestamp),
                oldFlowRate: event.oldFlowRate ? event.oldFlowRate : '-',
                newFlowRate: event.flowRate
            }))
            fullHistory = fullHistory.concat(events)
        })

        flows.outFlows.forEach(flow => {
            const events = flow.events.map(event => ({
                id: event.id,
                timestamp: parseInt(event.transaction.timestamp),
                oldFlowRate: event.oldFlowRate ? event.oldFlowRate : '-',
                newFlowRate: event.flowRate
            }))
            fullHistory = fullHistory.concat(events)
        })

        fullHistory.sort((a, b) => a - b)
        setHistory(fullHistory)
    
    }, [flows])

    return (
        <div
        style={{ overflow: 'scroll'}}
        >
            <h2>History</h2>
            <div>
                <table>
                    <thead className='history-thead'>
                        <tr>
                            <th className='history-th'>Time</th>
                            <th className='history-th'>Old Rate</th>
                            <th className='history-th'>New Rate</th>
                        </tr>
                    </thead>
                    <tbody className='history-body'>
                        {
                            !history ?
                            null :
                            history.map(event => {
                                const date = new Date(event.timestamp * 1000)
                                return (
                                    <tr>
                                        <td className='history-td'>
                                            {`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}
                                        </td>
                                        <td className='history-td'>{event.oldFlowRate}</td>
                                        <td className='history-td'>{event.newFlowRate}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>

    )
}

const mapStateToProps = state => {
    return ({
        user: state.user,
        flows: state.flows
    })
}

export default connect(mapStateToProps, null)(History)