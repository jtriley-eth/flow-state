import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import userReducer from './userSlice'

const store = configureStore({
	reducer: {
		user: userReducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export {
	toggleTheme,
	setAddress,
	setChain,
	setAddressAsync,
	setChainAsync,
	setAccountDataAsync
} from './userSlice'
export default store
