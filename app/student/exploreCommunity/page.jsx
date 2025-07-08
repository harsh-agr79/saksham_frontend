'use client'

import ExploreCommunity from "@/components/student/exploreCommunity.jsx";

import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ExplorePage() {
	const { isAuthenticated, userType } = useSelector((state) => state.auth)
	const router = useRouter()

	useEffect(() => {
		if (!isAuthenticated || userType !== 'student') { //change user type as needed
			router.replace('/') //change route as needed
		}
	}, [])
  
	return (
		<div>
		<ExploreCommunity />
		</div>
	);
}
