import { RegistrationForm } from '@/components/auth/registrationForm.jsx'

export default function Home() {
	const {API_KEY} = process.env

	return (
		<div>
			<RegistrationForm apiKey={API_KEY} />
		</div>
	)
}
