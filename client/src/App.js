import React, { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Navbar from './components/helpers/Navbar'
import Sidebar from './components/helpers/Sidebar'
import Main from './components/Main'

const App = props => {
    const { user } = props
    const [showMenu, setShowMenu] = useState(false)
    const toggleMenu = () => setShowMenu(!showMenu)

    return (
        <Router>
            <div className='screen'>
                <Navbar toggleMenu={toggleMenu} showMenu={showMenu} />
                <main>
                    <Route path='/' exact>
                        <Main />
                    </Route>
                    {
                        user.account ? <Sidebar showMenu={showMenu} /> : null
                    }
                </main>
            </div>
        </Router>
    )
}

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps, null)(App)