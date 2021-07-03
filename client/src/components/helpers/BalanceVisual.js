import { useState } from 'react'

const BalanceVisual = ({ balance, netFlowRate, timestamp, className='' }) => {
    const [time, setTime] = useState(Math.floor(Date.now() / 100))
    setTimeout(() => setTime(time + 1), 100)
    return (
        <span className={className}>
            {(((time - (timestamp * 10)) * (netFlowRate * 1e-19)) + (balance * 1e-19)).toFixed(8)}
        </span>
    )
}

export default BalanceVisual