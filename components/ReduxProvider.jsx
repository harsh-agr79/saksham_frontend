'use client'

import { Provider } from 'react-redux'
import { persistor, store } from '@/lib/redux/store'
import { PersistGate } from 'redux-persist/integration/react'

const ReduxProvider = ({ children }) => {
	return (
		<Provider store={store}>
			{persistor ? (
				<PersistGate loading={null} persistor={persistor}>
					{children}
				</PersistGate>
			) : (
				{ children }
			)}
		</Provider>
	)
}

export default ReduxProvider
