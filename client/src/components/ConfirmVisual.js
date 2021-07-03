import React, { useEffect, useState } from 'react'
import '../styles/ConfirmVisual.css'
import Loader from './helpers/Loader'
import pick from '../assets/pick.svg'
import mined from '../assets/mined.svg'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

const CountDown = () => {
    const [time, setTime] = useState(15)
    useEffect(() => {
        if (time > 0) {
            setTimeout(() => setTime(time - 1), 1000)
        }
    })
    return (
        <span>{time}</span>
    )
}

const ConfirmVisual = () => {
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        setTimeout(() => {setRedirect(true)}, 15000)
    }, [])

    if (redirect) {
        return <Redirect to='/' />
    }

    return (
        <div className='confirm-visual'>
            <div className='card progress'>
                <h3>Mining Your Transaction!</h3>
                <p>Estimated Time: <CountDown/> </p>
                <div className='progress-bar-wrapper'>
                    <div className='progress-bar' />
                </div>
                <Link to='/' className='confirm-link'>
                    Skip to Home
                </Link>
            </div>

            
            <div className='computer' id='computer1'>
                <div className='computer-screen'>
                    <Loader width={56} />
                </div>
            </div>
            <div className='computer' id='computer2'>
                <div className='computer-screen'>
                        <p className='computer-text'>Mining...</p>
                        <div style={{ display: 'flex', paddingTop: 8 }}>
                            <img
                                src={pick}
                                style={{ animationDelay: '1.5s' }}
                                alt='pick'
                                className='miner'
                            />
                            <img src={mined} alt='coin' className='mined' />
                        </div>
                </div>
            </div>
            <div className='computer' id='computer3'>
                <div className='computer-screen'>
                        <p className='computer-text'>Mining...</p>
                        <div style={{ display: 'flex', paddingTop: 8 }}>
                            <img
                                src={pick}
                                style={{ animationDelay: '1.7s' }}
                                alt='pick'
                                className='miner'
                            />
                            <img src={mined} alt='coin' className='mined' />
                        </div>
                </div>
            </div>
            <div className='computer' id='computer4'>
                <div className='computer-screen'>
                        <p className='computer-text'>Mining...</p>
                        <div style={{ display: 'flex', paddingTop: 8 }}>
                            <img
                                src={pick}
                                style={{ animationDelay: '1.9s' }}
                                alt='pick'
                                className='miner'
                            />
                            <img src={mined} alt='coin' className='mined' />
                        </div>
                </div>
            </div>
            <div className='computer' id='computer5'>
                <div className='computer-screen'>
                        <p className='computer-text'>Mining...</p>
                        <div style={{ display: 'flex', paddingTop: 8 }}>
                            <img
                                src={pick}
                                style={{ animationDelay: '2.1s' }}
                                alt='pick'
                                className='miner'
                            />
                            <img src={mined} alt='coin' className='mined' />
                        </div>
                </div>
            </div>
            <div className='signal' id='signal1'/>
            <div className='signal' id='signal2'/>
            <div className='signal' id='signal3'/>
            <div className='signal' id='signal4'/>
        </div>
    )
}

export default ConfirmVisual