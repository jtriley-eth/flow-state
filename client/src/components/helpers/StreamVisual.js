import React, { useState } from 'react'

const StreamVisual = ({ lastUpdate, flowRate, className, inFlow, sum }) => {
    const [time, setTime] = useState(Math.floor(new Date().getTime() / 1000))
    setTimeout(() => setTime(time + 1), 1000)
    return (
        <span className={className}>
            {inFlow ? '' : '-'}
            {((time - lastUpdate) * (flowRate * 10e-18) + sum)}
        </span>
    )
}

export default StreamVisual