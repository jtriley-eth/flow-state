import { useState } from 'react'

const BalanceVisual = ({ balance, netFlowRate, timestamp, className='' }) => {
    const [time, setTime] = useState(Math.floor(Date.now() / 100))
    setTimeout(() => setTime(time + 1), 100)
    return (
        <span className={className}>
            {(((time - (timestamp * 10)) * (netFlowRate * 10e-20)) + (balance * 10e-20)).toFixed(8)}
        </span>
    )
}

export default BalanceVisual