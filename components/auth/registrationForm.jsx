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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { registerUser } from '@/lib/redux/slices/authSlice'

export function RegistrationForm({ apiKey }) {
	const [name, setName] = React.useState('')
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [userType, setUserType] = React.useState('')

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

	const handleRegisterUser = async () => {
		const formData = {
			name,
			email,
			password,
			type: userType,
		}

		const res = await dispatch(registerUser({ formData, apiKey }))

		setEmail('')
		setName('')
		setPassword('')
		setUserType('')
	}

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<Card className='w-[350px]'>
				<CardHeader>
					<CardTitle className='text-center pb-3'>Register</CardTitle>
					<CardDescription></CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className='grid w-full items-center gap-4'>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='name'>Name</Label>
								<Input
									id='name'
									placeholder='Enter your name'
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>

							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									type='email'
									placeholder='Enter your email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='password'>Password</Label>
								<Input
									id='password'
									type='password'
									placeholder='Enter password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>

							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='framework'>User Type</Label>
								<Select value={userType} onValueChange={setUserType}>
									<SelectTrigger id='framework'>
										<SelectValue placeholder='Select' />
									</SelectTrigger>
									<SelectContent position='popper'>
										<SelectItem value='student'>Student</SelectItem>
										<SelectItem value='mentor'>Mentor</SelectItem>
										<SelectItem value='institute'>Institute</SelectItem>
										<SelectItem value='industry'>Industry</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className='flex flex-col justify-center items-center pt-1 pb-1'>
					{status === 'loading' && <p>Registering User...</p>}
					{message && <p>{message}</p>}
					<Button onClick={handleRegisterUser}>Register</Button>
				</CardFooter>
				<div className='text-center '>
					Already have an account?
					<Button variant='link'>Login</Button>
				</div>
			</Card>
		</div>
	)
}
