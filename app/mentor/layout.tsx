'use client'

import { SidebarProvider } from "@/components/ui/sidebar"
import { Sidenav } from "@/components/mentor/sidenav"
import { Topnav } from "@/components/mentor/topnav"


export default function Layout({ children }: { children: React.ReactNode }) {
 

  return (
    <SidebarProvider>
      
      <Sidenav />
      <main className="mainclass">
      <Topnav/>
        <section className="main-container">
            {children}
        </section>
      </main>
    </SidebarProvider>
  )
}
