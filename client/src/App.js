import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/helpers/Navbar'
import Sidebar from './components/helpers/Sidebar'
import Main from './components/Main'

const App = () => {
    return (
        <Router>
            <div className='screen'>
                <Navbar/>
                <main>
                    <Sidebar/>
                    <Route path='/' exact component={Main} />
                </main>
            </div>
        </Router>
    )
}

export default App
