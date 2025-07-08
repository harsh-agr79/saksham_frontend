'use client';

// import { Button } from '@/components/ui/button'
// import { CardsTop } from '@/components/student/studentTopCards'
import { VocationalCourses } from '@/components/student/vocational.jsx'
// import { Parallax3DObjects } from '@/components/student/parallex3Dobject.jsx'
import { MyCardboardVR } from '@/components/student/CardVR.jsx'
import {CommunityCards } from '@/components/student/dashboardCommunity'
import {EventCards} from '@/components/student/MarkUR.jsx'
import CoverImage, {coverImage} from '@/components/student/landCoverPage.jsx'


//FOR PROTECTED ROUTES
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Dashboard from '@/components/student/dashboard';

export default function Home() {
	const { isAuthenticated, userType } = useSelector((state) => state.auth)
	const router = useRouter()

	useEffect(() => {
		if (!isAuthenticated || userType !== 'student') { //change user type as needed
			router.replace('/auth/login') //change route as needed
		}
	}, [])

	return (
		<div>
			<Dashboard/>

		</div>
	)
}
