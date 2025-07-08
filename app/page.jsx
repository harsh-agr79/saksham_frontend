// 'use client'

// import { Button } from '@/components/ui/button'
// import { logout } from '@/lib/redux/slices/authSlice'
// import { useRouter } from 'next/navigation'
// import { useDispatch, useSelector } from 'react-redux'

// export default function Home() {
// 	const router = useRouter()
// 	const dispatch = useDispatch()
// 	const { status } = useSelector((state) => state.auth)

// 	const handleLogout = async () => {
// 		try {
// 			await dispatch(logout())
// 			router.push('/auth/login')
// 		} catch (error) {
// 			console.log(error)
// 		}
// 	}

// 	return (
// 		<div>
// 			<Button onClick={handleLogout}>Logout</Button>
// 		</div>
// 	)
// }
'use client'

import { Hero } from "@/components/landingpage/hero.jsx"
// import { Teacher } from "@/components/landingpage/teacher.jsx"
// import { Student } from "@/components/landingpage/student.jsx"
// import { MoreInfoModal } from "@/components/landingpage/moreInfo.jsx"
// import { Footer } from "@/components/landingpage/footer.jsx"
import { Button } from '@/components/ui/button'
import { logout } from '@/lib/redux/slices/authSlice'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { Values } from '@/components/landingpage/value.jsx'
export default function Home() {
	const router = useRouter()
	const dispatch = useDispatch()
	const { status, userType } = useSelector((state) => state.auth)

	

	return (
		<div>
			{/* <Button onClick={handleLogout}>Logout</Button> */}
            {/* <Navbar/> */}
            <Hero status={status}/>
            {/* <Values/>
            <Teacher/>
            <Student/>
            <MoreInfoModal/>
            <Footer/> */}
		</div>
	)
}
