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
    Briefcase,
    Trophy,
    ClipboardList,
    Calendar,
  } from 'lucide-react';

// Menu items.
const items = [
    {
      title: 'Apprenticeships',
      url: '/company/apprenticeships',
      icon: Home
    },
    {
      title: 'Manage Apprenticeships',
      url: '/company/manageApprenticeship',
      icon: Briefcase,
    },
    {
      title: 'Skillathon',
      url: '/company/createHackContest',
      icon: Trophy,
    },
    {
      title: 'Manage Skillathon',
      url: '/company/manageHackathon',
      icon: ClipboardList ,
    },
    {
      title: 'Events',
      url: '/company/eventListing',
      icon: Calendar ,
    },
  ];
export function Sidenav() {
	return (
		<Sidebar className='z-50'>
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
