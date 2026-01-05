
import * as React from "react";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { redirect } from "next/navigation";
import { AppSidebar } from "./dashboard/components/app-sdiebar";
import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TopNavbar } from "./dashboard/components/top-navbar";
import { getSession } from "@/actions/auth";


const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Uganda Multi-School Management System",
  description: "Super Admin Dashboard for managing multiple schools across Uganda",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default async function DashboardLayout({children}:{children:React.ReactNode}) {


 const session = await getSession();
  if (!session) redirect("/login");

  const user = session?.user;

  // const me = await fetchMe();
  // const user = me?.data ?? session.user;


  return (
    <SidebarProvider>
      <AppSidebar user={user}/>
          <SidebarInset>
          <div className="ml-[240px]">
            <TopNavbar title="Dashboard Overview" />
            <div className="p-4">{children}</div>
          </div>
          </SidebarInset>
        </SidebarProvider>
  )
}


