import React, { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser, getFlows, getEvents } from './redux/ActionCreators'

import Navbar from './components/helpers/Navbar'
import Sidebar from './components/helpers/Sidebar'
import Main from './components/Main'
import FullHistory from './components/FullHistory'
import Auth from './components/Auth'
import Checkout from './components/Checkout'
import ConfirmVisual from './components/ConfirmVisual'

const App = props => {
    const { user, getFlows, getEvents } = props
    const [showMenu, setShowMenu] = useState(false)
    const toggleMenu = () => setShowMenu(!showMenu)

    const initialize = useCallback(address => {
        getFlows(address)
        getEvents(address)
    }, [getFlows, getEvents])

    useEffect(() => {
        if (user.account !== '') {
            initialize(user.account)
        }
    }, [user.account, initialize])

    return (
        <Router>
            <div className='screen'>
                <Navbar toggleMenu={toggleMenu} showMenu={showMenu} />
                <main>
                    {
                        user.account ?
                            <>
                            <Route path='/' exact>
                                <Main />
                            </Route>
                            <Route path='/history' exact>
                                <FullHistory />
                            </Route>
                            <Route path='/checkout' exact>
                                <Checkout />
                            </Route>
                            <Route path='/confirming' exact>
                                <ConfirmVisual />
                            </Route>
                            {
                                user.account ? <Sidebar showMenu={showMenu} /> : null
                            }
                            </>
                        :
                        <Auth />
                        }
                </main>
            </div>
        </Router>
    )
}

const mapStateToProps = state => ({ user: state.user })

const mapDispatchToProps = {
    getUser,
    getFlows,
    getEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
