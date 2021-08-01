import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import {
	getTokenDataAsync,
	getAddressWeb3,
	getChainNameWeb3
} from '../helpers/api'
import { ChainName, TokenData, UserState } from '../types'

const setAddressAsync = createAsyncThunk('user/setAddressAsync', async () => {
	const address = await getAddressWeb3()
	return address
})

const setChainAsync = createAsyncThunk<ChainName, void, {}>(
	'user/setChainAsync',
	async () => {
		const chain = await getChainNameWeb3()
		return chain
	}
)

const setTokenDataAsync = createAsyncThunk<
	TokenData,
	{ address: string; chain: ChainName },
	{}
>('user/setAccountDataAsync', async data => {
	return getTokenDataAsync(data.address, data.chain).then(data => data)
})

const initialState: UserState = {
	address: '',
	chain: 'unknown',
	isDark: true,
	tokens: []
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		toggleTheme: state => {
			state.isDark = !state.isDark
		},
		setAddress: (state, action: PayloadAction<string>) => {
			state.address = action.payload
		},
		setChain: (state, action: PayloadAction<ChainName>) => {
			state.chain = action.payload
		}
	},
	extraReducers: builder => {
		builder.addCase(setAddressAsync.fulfilled, (state, action) => {
			state.address = action.payload
		})
		builder.addCase(setChainAsync.fulfilled, (state, action) => {
			state.chain = action.payload
		})
		builder.addCase(setTokenDataAsync.fulfilled, (state, action) => {})
	}
})

export { setAddressAsync, setChainAsync, setTokenDataAsync }
export const { toggleTheme, setAddress, setChain } = userSlice.actions
export default userSlice.reducer
