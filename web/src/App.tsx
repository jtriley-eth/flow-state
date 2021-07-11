import { useCallback, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { connect } from 'react-redux'
import { setEvents, setFlows } from './redux/account/actions'
import { setAddress, setTheme } from './redux/user/actions'

import { RootState, UserState, AccountState } from './types'

import Landing from './components/Landing'

type AppProps = {
    user: UserState
    account: AccountState
    setAddress: (address?: string) => void
    setTheme: () => void
    setEvents: (address: string) => void
    setFlows: (address: string) => void
}

function App(props: AppProps) {

    

    return (
        <div className="screen">
            <Landing/>
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    user: state.user,
    account: state.account
})

const mapDispatchToProps = {
    setAddress,
    setTheme,
    setFlows,
    setEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(App)