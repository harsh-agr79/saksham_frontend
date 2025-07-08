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
import { useRouter, useSearchParams } from 'next/navigation'

export function ResetPassForm({ apiKey }) {
	const [password, setPassword] = React.useState('')
	const [confirmPassword, setConfirmPassword] = React.useState('')
	const [message, setMessage] = React.useState('')

	const router = useRouter()
	const searchParams = useSearchParams()

	const handleSubmit = async () => {
		try {
			if (password !== confirmPassword) {
				setMessage('Passwords do not match!!')
				return
			}
			const formData = {
				email: searchParams.get('email'),
				token: searchParams.get('token'),
				password,
				password_confirmation: confirmPassword,
			}

			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/reset-password`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'x-api-key': apiKey,
					},
					body: JSON.stringify(formData),
				}
			)
			const data = await res.json()

			if (data) {
				setMessage(data.message)
				router.replace('/auth/login')
			}
		} catch (error) {
			console.log('[RESET_PASS]', error)
		}
	}

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<Card className='w-[350px]'>
				<CardHeader>
					<CardTitle className='text-center pb-3'>Reset Password!</CardTitle>
					<CardDescription></CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className='grid w-full items-center gap-4 pb-2 pt-2'>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='password' className='pb-2'>
									Enter new password
								</Label>
								<Input
									id='password'
									type='password'
									placeholder='Enter your password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						</div>

						<div className='grid w-full items-center gap-4 pb-2 pt-2'>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='password' className='pb-2'>
									Confirm password
								</Label>
								<Input
									id='password'
									type='password'
									placeholder='Confirm your password'
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className='flex flex-col justify-center items-center pt-1 pb-3'>
					{message && <p>{message}</p>}
					<Button onClick={handleSubmit}>Set Password</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
