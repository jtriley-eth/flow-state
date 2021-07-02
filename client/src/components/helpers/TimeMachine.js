import React, { useEffect } from 'react'
import '../../styles/helpers/TimeMachine.css'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip
} from 'recharts'
import { connect } from 'react-redux'

const data = [
    {
      name: "Page A",
      balance: 4000
    },
    {
      name: "Page B",
      balance: 3000
    },
    {
      name: "Page C",
      balance: 2000
    },
    {
      name: "Page D",
      balance: 2780
    },
    {
      name: "Page E",
      balance: 1890
    },
    {
      name: "Page F",
      balance: 2390
    },
    {
      name: "Page G",
      balance: 3490
    }
]

const TimeMachine = props => {
    // const { startTIme, endTime, tokenSymbol } = props
    const { events, account /*startTime, endTime*/ } = props.user
    const tokenSymbol = 'fDAIx'
    console.log(events)
    const startTime = 1624060264

    const getChartData = () => {
        let startBalance = 0
        let activeFlows = []

        // Spaghetti Code of The Century :)
        events.forEach(event => {
            const { timestamp, note } = event

            // MUST match token symbol
            if (event.token.symbol === tokenSymbol) {

                // Calculate Starting Balance
                if (timestamp < startTime) {

                    if (note === 'Token Upgrade') {
                        console.log('token upgrade', event.amount * 10e-19)
                        startBalance += event.amount

                    } else if (note === 'Token Downgrade') {
                        startBalance -= event.amount

                    } else if (note === 'Stream Start') {
                        console.log('stream start')
                        activeFlows.push({
                            flowRate: event.newFlowRate,
                            receiver: event.receiver,
                            sender: event.sender,
                            sumRecorded: 0,
                            timestamp: event.timestamp
                        })

                    } else if (note === 'Stream End') {
                        activeFlows.filter(flow => !(
                            flow.flowRate === event.oldFlowRate &&
                            flow.sender === event.sender &&
                            flow.receiver === event.receiver
                        ))

                        if (account === event.sender) {
                            startBalance -= event.sum
                        } else {
                            startBalance += event.sum
                        }

                    } else if (note === 'Stream Update') {
                        const index = activeFlows.findIndex(flow => {
                            return (
                                flow.flowRate === event.oldFlowRate &&
                                flow.sender === event.sender &&
                                flow.receiver === event.receiver
                            )
                        })
                        if (typeof activeFlows[index] !== 'undefined') {
                            if (account === event.sender) {
                                startBalance -= (event.sum - activeFlows[index].sumRecorded)
                                activeFlows[index].sumRecorded += event.sum
                            } else {
                                startBalance += (event.sum - activeFlows[index].sumRecorded)
                                activeFlows[index].sumRecorded += event.sum
                            }
                        }

                    }
                }
            }
        })

        if (activeFlows.length !== 0) {
            activeFlows.forEach(flow => {
                const balanceChange = ((startTime - flow.timestamp) * flow.flowRate)
                console.log('flow.timestamp', flow.timestamp)
                console.log('startTime', startTime)
                console.log('flow.flowRate', flow.flowRate)
                if (flow.receiver === account) {
                    startBalance += balanceChange
                } else if (flow.sender === account) {
                    startBalance -= balanceChange
                }
            })
        }
        return startBalance * 10e-19
    }

    useEffect(() => {
        console.log('data', getChartData())
    // eslint-disable-next-line
    }, [])

    return (
        <div className='timemachine'>
            <AreaChart
                width={500}
                height={400}
                data={data}
                className='timemachine-chart'
            >
                <defs>
                    <linearGradient
                        id="colorBalance"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="5%"
                            stopColor="#7DB1FF"
                            stopOpacity={0.9}
                        />
                        <stop
                            offset="95%"
                            stopColor="#D57DFF"
                            stopOpacity={0.5}
                        />
                    </linearGradient>
                </defs>
                <XAxis stroke='#d0d0d0' />
                <YAxis stroke='#d0d0d0' />
                <Tooltip
                    contentStyle={{ background: '#303030', borderRadius: 4 }}
                    labelStyle={{ color: '#f0f0f0' }}
                />
                <Area
                    type='monotone'
                    dataKey='balance'
                    stroke="#D57DFF"
                    fillOpacity={1}
                    fill="url(#colorBalance)"
                />
            </AreaChart>
            <div className=''>

            </div>
        </div>
    )
}

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps, null)(TimeMachine)