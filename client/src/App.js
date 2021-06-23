import { ethers } from 'ethers'
import React, { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/helpers/Navbar'
import Sidebar from './components/helpers/Sidebar'
import Main from './components/Main'

const App = () => {
    const [showMenu, setShowMenu] = useState(false)
    const toggleMenu = () => setShowMenu(!showMenu)
    const [account, setAccount] = useState('')

    const requestAccount = async () => {
        return await window.ethereum.request({ method: 'eth_requestAccounts' })
    }

    const getAddress = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const walletAddress = await requestAccount()
            setAccount(walletAddress)
        } else {
            alert('You need a web 3.0 provider to perform this action')
        }
    }

    return (
        <Router>
            <div className='screen'>
                <Navbar toggleMenu={toggleMenu} showMenu={showMenu} />
                <main>
                    <Route path='/' exact>
                        <Main account={account} getAddress={getAddress} />
                    </Route>
                    <Sidebar showMenu={showMenu} />
                </main>
            </div>
        </Router>
    )
}

export default App
