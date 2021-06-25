import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { user } from './user'
import { flows } from './flows'

const rootReducer = combineReducers({ user, flows })
export const store = createStore(rootReducer, applyMiddleware(thunk))