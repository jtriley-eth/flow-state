import { useState } from 'react'

const StreamVisual = ({ lastUpdate, flowRate, inFlow, sum, className='' }) => {
    const [time, setTime] = useState(Math.floor(Date.now() / 100))
    setTimeout(() => setTime(time + 1), 100)
    return (
        <span className={className}>
            {inFlow ? '' : '-'}
            {(((time - (lastUpdate * 10)) * (flowRate * 10e-20)) + (sum * 10e-20)).toFixed(8)}
        </span>
    )
}

export default StreamVisual