import React, { useState } from 'react'
import '../../styles/helpers/Chart.css'
import {getChartData} from '../../constants/timestuff'
import { connect } from 'react-redux'
import {AreaChart, XAxis, YAxis, Area, Tooltip} from 'recharts'

const Chart = (props) => {
    const secondsInDay = 86400
    const secondsInWeek = 604800
    const secondsInYear = 3.154e7

    const [timeframe, setTimeframe] = useState(secondsInWeek)

    const{ user } = props
    const now = Math.floor(Date.now() / 1000)
    const chartData = getChartData(user.events, now - timeframe, now, "fDAIx", user.account)

    return (
        <div>
            <h2>Chart</h2>
            <AreaChart width={650} height={250} data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
            <XAxis tick={false} stroke="#d0d0d0"/>
            <YAxis stroke="#d0d0d0"/>
            <Tooltip
                contentStyle={{ background: '#303030', borderRadius: 4 }}
                labelStyle={{ color: '#f0f0f0' }}
            />
            <Area
                type="monotone"
                dataKey="balance"
                stroke="#D57DFF"
                fillOpacity={1}
                fill="url(#colorBalance)"
            />
            </AreaChart>
            <form className='chip-bar'>
                <div
                    className={
                        timeframe === secondsInDay ? 'chip selected' : 'chip'
                    }
                    onClick={() => setTimeframe(secondsInDay)}
                >
                    day
                </div>
                <div
                    className={
                        timeframe === secondsInWeek ? 'chip selected' : 'chip'
                    }
                    onClick={() => setTimeframe(secondsInWeek)}
                >
                    week
                </div>
                <div
                    className={
                        timeframe === secondsInYear ? 'chip selected' : 'chip'
                    }
                    onClick={() => setTimeframe(secondsInYear)}
                >
                    year
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => ({user: state.user})

export default connect(mapStateToProps, null)(Chart)