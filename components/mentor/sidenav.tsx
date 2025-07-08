import Image from 'next/image'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
} from '@/components/ui/sidebar'
import {
    Home,
    Users,
    BookOpen,
    BarChart,
    Calendar,
    Box,
    GraduationCap,
    Layers,
    List,
  } from 'lucide-react';
  
  // Menu items.
  const items = [
    {
      title: 'Dashboard',
      url: '/mentor/dashboard',
      icon: BarChart, // Represents an analytics or data dashboard
    },
    // {
    //   title: 'Profile',
    //   url: '/mentor/profile',
    //   icon: Users, // Represents a group or community of people
    // },
    {
      title: 'Community',
      url: '/mentor/exploreCommunity',
      icon: Users, // Represents a group or community of people
    },
    {
      title: 'Manage Courses',
      url: '/mentor/manageCourses',
      icon: BookOpen, // Represents coursework or learning management
    },
    {
      title: 'Create Community',
      url: '/mentor/manageMyCommunity',
      icon: Layers, // Represents building or managing a community
    },
    // {
    //   title: '3D Modeling',
    //   url: '/mentor/3d',
    //   icon: Box, // Represents creating 3D objects and environments
    // },
    // {
    //   title: 'My 3D Environment',
    //   url: '/mentor/My3DEnvironment',
    //   icon: List, // Represents a personalized learning or project space
    // },
  ];
  
  export default items;
  
export function Sidenav() {
	return (
		<Sidebar className='z-50 bg-purple-100'>
			<SidebarTrigger className='absolute -right-12 top-2 p-5 flex justify-center items-center bg-[#FFF5EE] rounded-full shadow-md' />
			<SidebarContent>
            <div className="flex items-center justify-items-center gap-2">
        <SidebarTrigger className="p-5 flex justify-center items-center bg-white rounded-full md:hidden" />
        <Image
          src="/images/saksham.png" // Replace with your logo's file path
          alt="Logo"
          width={200} // Adjust based on your design
          height={160} // Adjust based on your design
          className="h-full object-contain"
        />
      </div>
				<SidebarGroup>
					{/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}
