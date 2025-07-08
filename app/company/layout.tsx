'use client';

import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidenav } from "@/components/company/sidenav";
import { Topnav } from "@/components/student/topnav";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Determine if the Sidenav should not be shown for "/student/learningDashboard/{id}"
  const shouldHideSidenav = pathname.startsWith("/student/learningDashboard/");

  return (
    <SidebarProvider>
      {!shouldHideSidenav && <Sidenav />}
      <main className="mainclass">
        <Topnav />
        <section className="main-container">{children}</section>
      </main>
    </SidebarProvider>
  );
}
