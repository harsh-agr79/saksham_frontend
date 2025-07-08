import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async ({ formData, apiKey }, thunkAPI) => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-api-key': apiKey,
				},
				body: JSON.stringify(formData),
			}
		)

		if (!response.ok) {
			const error = await response.json()
			return thunkAPI.rejectWithValue(error)
		}

		const data = await response.json()
		return data
	}
)

export const registerUser = createAsyncThunk(
	'auth/registerUser',
	async ({ formData, apiKey }, thunkAPI) => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-api-key': apiKey,
				},
				body: JSON.stringify(formData),
			}
		)

		if (!response.ok) {
			const error = await response.json()
			return thunkAPI.rejectWithValue(error)
		}

		const token = await response.json()
		return token
	}
)

const initialState = {
	user: null, // Will store user details
	token: null, // Store JWT or any token
	isAuthenticated: false, // Indicates if the user is logged in
	status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
	message: null,
	userType: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			state.user = null
			state.token = null
			state.isAuthenticated = false
			state.status = 'idle'
			state.message = null
			state.userType = null
			sessionStorage.authToken = null
			sessionStorage.userType = null
			sessionStorage.user = null
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending || registerUser.pending, (state) => {
				state.status = 'loading'
				state.message = null
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.message = action.payload.message
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.token = action.payload.token
				state.user = action.payload.user
				state.userType = action.payload.type
				state.isAuthenticated = true
				sessionStorage.authToken = state.token
				sessionStorage.userType = state.userType
				sessionStorage.user = JSON.stringify(state.user)
			})
			.addCase(loginUser.rejected || registerUser.rejected, (state, action) => {
				state.status = 'failed'
				state.message = action.payload
			})
	},
})

export const { logout } = authSlice.actions
export default authSlice.reducer
