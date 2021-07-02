import React from 'react'
import '../../styles/helpers/TimeMachine.css'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip
} from 'recharts'
import { connect } from 'react-redux'
import { getChartData } from '../../constants/timestuff'

const TimeMachine = props => {
    const { startTime, endTime, tokenSymbol } = props
    const { events, account } = props.user

    const chartData = getChartData(events, startTime, endTime, tokenSymbol, account)
    return (
        <div className='timemachine'>
            <AreaChart
                width={600}
                height={400}
                data={chartData}
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
                <XAxis
                    stroke='#d0d0d0'
                    tick={false}
                    />
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