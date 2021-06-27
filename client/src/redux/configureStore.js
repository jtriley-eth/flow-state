import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { user } from './user'

const rootReducer = combineReducers({ user })
export const store = createStore(rootReducer, applyMiddleware(thunk))
