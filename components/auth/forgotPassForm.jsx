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

export function ForgotPassForm({ apiKey }) {
	const [email, setEmail] = React.useState('')
	const [message, setMessage] = React.useState('')

	const handleSubmit = async () => {
		try {
			const formData = {
				email,
			}

			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/forgot-password`,
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
			}
		} catch (error) {
			console.log('[FORGOT_PASS]', error)
		}
	}

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<Card className='w-[350px]'>
				<CardHeader>
					<CardTitle className='text-center pb-3'>Forgot Password?</CardTitle>
					<CardDescription></CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className='grid w-full items-center gap-4'>
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
						</div>
					</form>
				</CardContent>
				<CardFooter className='flex flex-col justify-center items-center pt-1 pb-3'>
					{message && <p>{message}</p>}
					<Button onClick={handleSubmit}>Send verification code</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
