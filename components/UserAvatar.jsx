import {
	User,
	LogOut,
  } from 'lucide-react';
  
  import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
  import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuShortcut,
  } from '@/components/ui/dropdown-menu';
  
  import { useRouter } from 'next/navigation';
  import { useDispatch } from 'react-redux';
  import { logout } from '@/lib/redux/slices/authSlice'
  
  export function UserAvatar() {
	const router = useRouter();
	const dispatch = useDispatch();
  
	const handleLogout = async () => {
	  try {
		await dispatch(logout());
		router.push('/auth/login');
	  } catch (error) {
		console.error('Logout failed:', error);
	  }
	};
  
	return (
	  <DropdownMenu className="bg-white">
		<DropdownMenuTrigger asChild>
		  <Avatar>
			<AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
			<AvatarFallback>CN</AvatarFallback>
		  </Avatar>
		</DropdownMenuTrigger>
		<DropdownMenuContent className="w-56 bg-white">
		  <DropdownMenuLabel>My Account</DropdownMenuLabel>
		  <DropdownMenuSeparator />
		  <DropdownMenuSeparator />
		  <DropdownMenuItem onClick={handleLogout}>
			<LogOut className="mr-2 h-4 w-4" />
			<span>Log out</span>
			<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
		  </DropdownMenuItem>
		</DropdownMenuContent>
	  </DropdownMenu>
	);
  }
  