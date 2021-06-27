import React from 'react'
import '../../styles/helpers/History.css'
// import Loader from './Loader'
import { connect } from 'react-redux'

const History = props => {
    const { events } = props.user
    console.log(events)

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
                        <tr>
                            <td className='history-td'>
                                timestamp
                            </td>
                            <td className='history-td'>token</td>
                            <td className='history-td'>type</td>
                            <td className='history-td'>oldFlowRate</td>
                            <td className='history-td'>newFlowRate</td>
                            <td className='history-td'>sender</td>
                            <td className='history-td'>receiver</td>
                            <td className='history-td'>amount</td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps, null)(History)