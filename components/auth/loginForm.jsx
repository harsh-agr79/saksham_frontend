'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { loginUser } from '@/lib/redux/slices/authSlice'

export function LoginForm({ apiKey }) {
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')

	const dispatch = useDispatch()
	const router = useRouter()
	const { status, message, isAuthenticated } = useSelector(
		(state) => state.auth
	)

	React.useEffect(() => {
		if (isAuthenticated) {
			router.replace('/')
		}
	}, [])

	const handleUserLogin = async () => {
		try {
			const formData = {
				email,
				password,
			}

			const res = await dispatch(loginUser({ formData, apiKey }))

			setEmail('')
			setPassword('')

			if (res.payload.token) router.replace('/')
		} catch (error) {
			console.log('[LOGIN]', error)
		}
	}

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<Card className=' w-80 justify-center'>
				<CardHeader>
					<CardTitle className='text-center pb-3'>Login</CardTitle>
					<CardDescription></CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className='grid w-full items-center gap-4 pb-3'>
							<div className='flex flex-col space-y-1.5 pb-2'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									placeholder='Enter your email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className='flex flex-col space-y-1.5 pb-2'>
								<Label htmlFor='password'>Password</Label>
								<Input
									id='password'
									type='password'
									placeholder='Enter your password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						</div>
						{status === 'loading' && <p>Logging In...</p>}
						{message && <p>{message}</p>}
					</form>
				</CardContent>
				<CardFooter className='flex justify-between'>
					<Button variant='outline'>Forgot Password</Button>
					<Button variant='outline' onClick={handleUserLogin}>Login</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
