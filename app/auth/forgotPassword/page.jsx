import { ForgotPassForm } from '@/components/auth/forgotPassForm.jsx'

export default function Home() {
	const { API_KEY } = process.env

	return (
		<div>
			<ForgotPassForm apiKey={API_KEY} />
		</div>
	)
}
