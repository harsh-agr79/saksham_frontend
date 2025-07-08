import { ResetPassForm } from '@/components/auth/resetPassForm.jsx'

export default function Home() {
	const { API_KEY } = process.env
	return (
		<div>
			<ResetPassForm apiKey={API_KEY} />
		</div>
	)
}
