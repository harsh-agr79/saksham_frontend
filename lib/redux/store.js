import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // Defaults to localStorage for web
import { combineReducers } from 'redux'

import authSlice from '@/lib/redux/slices/authSlice'
import createTransform from 'redux-persist/es/createTransform'

// Transform to exclude `message` from persistence
const authTransform = createTransform(
  // Transform inbound state before saving
  (inboundState) => {
    const { message, ...rest } = inboundState;
    return rest;
  },
  // Transform outbound state when loading
  (outboundState) => outboundState,
  { whitelist: ['auth'] } // Apply only to the 'auth' slice
);

// Combine all slices
const rootReducer = combineReducers({
	auth: authSlice,
   //dummy: dummySlice //Just a dummy, replace with other redux slices
})

// Redux Persist configuration
const persistConfig = {
	key: 'root', // The key in localStorage
	storage,
	transforms: [authTransform]
}

// Persist the reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configure the store
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false, // Required for redux-persist
		}),
})

// Persistor
export const persistor = persistStore(store)
