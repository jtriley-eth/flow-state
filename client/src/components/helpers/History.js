import React from 'react'
import '../../styles/helpers/History.css'
import Loader from './Loader'

const History = () => {
    return (
        <div>
            <h2>History</h2>
            <div
                style={{
                    height: 300,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Loader />
            </div>
        </div>

    )
}

export default History