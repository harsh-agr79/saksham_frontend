'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { SidebarTrigger } from '@/components/ui/sidebar'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { NotificationButton } from '@/components/NotificationButton.jsx'
import { UserAvatar } from '@/components/UserAvatar.jsx'
import { MenuButton } from '@/components/MenuButton.jsx'

export function Topnav() {
	return (
		<div className='z-40 bg-white flex justify-between pd-10 px-12 max-md:px-4 max-sm:px-1'>
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
			
			<div className='flex gap-2 items-center'>
				
				<UserAvatar />
				<MenuButton className='md:hidden' />
			</div>
		</div>
	)
}

const ListItem = React.forwardRef<
	React.ElementRef<'a'>,
	React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className
					)}
					{...props}
				>
					<div className='text-sm font-medium leading-none'>{title}</div>
					<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	)
})
ListItem.displayName = 'ListItem'
