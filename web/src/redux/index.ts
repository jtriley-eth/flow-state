import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { account } from './account/reducers'
import { user } from './user/reducers'

const rootReducer = combineReducers({
    account,
    user
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store