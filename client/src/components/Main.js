import React from 'react'
import Chart from './helpers/Chart'
import Flows from './helpers/Flows'
import History from './helpers/History'
import '../styles/Main.css'

const Main = () => {

    return (
        <div className='main'>
            <section className='main-section top'>
                <div className='card main-card'>
                    <Chart />
                </div>
                <div id='flows-card' className='card main-card'>
                    <Flows />
                </div>
            </section>
            <section className='main-section bottom'>
                <div className='card main-card'>
                    <History />
                </div>
            </section>
        </div>
    )
}

export default Main