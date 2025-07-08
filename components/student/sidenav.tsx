import Image from "next/image";
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
} from "@/components/ui/sidebar";
import {
  Home,
  Users,
  BookOpen,
  BarChart,
  Calendar,
  Award,
  GraduationCap,
  Briefcase,
  List,
  Trophy,
  CalendarCheck,
  Box,
  User,
  UserPlus,
  Book,
  Terminal,
  TrendingUp,
  Code,
  Gamepad,
  Music,
  MapPin,
} from "lucide-react";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/student/dashboard",
    icon: BarChart, // Represents analytics or dashboards
  },
  {
    title: "My Profile",
    url: "/student/profile",
    icon: User, // Represents profile page
  },
  {
    title: "Explore Communities",
    url: "/student/exploreCommunity",
    icon: UserPlus, // Represents community or group
  },
  {
    title: "Browse Courses",
    url: "/student/courses",
    icon: BookOpen, // Represents learning or courses
  },
  {
    title: "Upcoming Events",
    url: "/student/eventListingStudent",
    icon: Calendar, // Represents events or scheduling
  },
  {
    title: "Skillathon",
    url: "/student/hackathonContestListing",
    icon: Trophy, // Represents competitions or achievements
  },
  {
    title: "ApprenticeShip",
    url: "/student/apprenticeship",
    icon: Trophy, // Represents competitions or achievements
  },
  {
    title: "My Courses",
    url: "/student/myCourses",
    icon: Book, // Represents personal courses
  },
  {
    title: "My Skillathons",
    url: "/student/myHackContest",
    icon: Award, // Represents personal achievements or skillathons
  },
  {
    title: "My Events",
    url: "/student/myRegisteredEvents",
    icon: CalendarCheck, // Represents confirmed events or registrations
  },
  {
    title: "Applied Apprenticeships",
    url: "/student/myApprenticeship",
    icon: CalendarCheck, // Represents confirmed events or registrations
  },
  {
    title: "Coding Challenge",
    url: "/student/challengeList",
    icon: Terminal, // Represents coding challenges
  },
  {
    title: "Learning Progress",
    url: "/student/contribution",
    icon: TrendingUp, // Represents contribution or growth
  },
  {
    title: "Code editor",
    url: "/student/editor",
    icon: Code, // Represents code editor
  },
  {
    title: "Coding Game",
    url: "/student/Game",
    icon: Gamepad, // Represents a game
  },
  {
    title: "Youtube Playlists",
    url: "/student/playlistPage",
    icon: Music, // Represents playlist or music
  },
  {
    title: "Learning Roadmaps",
    url: "/student/roadmaps",
    icon: MapPin, // Represents roadmaps or navigation
  },
  {
    title: "DSA Problems",
    url: "/student/DSA",
    icon: Terminal, // Represents coding challenges
  },
];

export function Sidenav() {
  return (
    <Sidebar className="z-50 bg-purple-100">
      <SidebarTrigger className=" bg-[#FFF5EE] absolute -right-12 top-6 p-5 flex justify-center items-center rounded-full shadow-md" />
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
  );
}
