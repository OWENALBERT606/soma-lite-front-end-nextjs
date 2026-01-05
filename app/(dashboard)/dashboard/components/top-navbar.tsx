"use client"

import * as React from "react"
import { Bell, Search } from "lucide-react"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface TopNavbarProps {
  title?: string
  breadcrumbs?: Array<{ label: string; href?: string }>
}

export function TopNavbar({ title = "Dashboard", breadcrumbs }: TopNavbarProps) {
  const [notifications] = React.useState([
    {
      id: 1,
      title: "New school registered",
      description: "Kampala International School has been added to the system",
      time: "5 minutes ago",
      unread: true,
    },
    {
      id: 2,
      title: "System backup completed",
      description: "Daily backup completed successfully",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "Fee payment received",
      description: "UGX 15,000,000 received from 3 schools",
      time: "2 hours ago",
      unread: false,
    },
  ])

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background px-3 md:h-16 md:px-6">
      <SidebarTrigger className="-ml-1" />

      <div className="flex flex-1 items-center gap-2 md:gap-4">
        <div className="flex-1 min-w-0">
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <nav className="flex items-center gap-1.5 text-sm text-muted-foreground md:gap-2">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <span className="text-muted-foreground/50">/</span>}
                  <span className={`truncate ${index === breadcrumbs.length - 1 ? "font-medium text-foreground" : ""}`}>
                    {crumb.label}
                  </span>
                </React.Fragment>
              ))}
            </nav>
          ) : (
            <h1 className="truncate text-base font-semibold md:text-lg">{title}</h1>
          )}
        </div>

        <div className="relative hidden md:flex md:flex-1 md:max-w-md lg:max-w-lg">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input type="search" placeholder="Search schools, users, transactions..." className="pl-8" />
        </div>
      </div>

      <div className="flex items-center gap-1 md:gap-2">
        <Button variant="ghost" size="icon" className="md:hidden size-9">
          <Search className="size-5" />
          <span className="sr-only">Search</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative size-9">
              <Bell className="size-5" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full p-0 text-[10px] font-semibold"
                >
                  {unreadCount}
                </Badge>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[calc(100vw-2rem)] md:w-96">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-auto">
                  {unreadCount} new
                </Badge>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[60vh] overflow-y-auto md:max-h-96">
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex flex-col items-start gap-1.5 p-3 cursor-pointer"
                >
                  <div className="flex w-full items-start justify-between gap-2">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{notification.title}</p>
                      <p className="text-xs text-muted-foreground leading-snug">{notification.description}</p>
                    </div>
                    {notification.unread && <div className="mt-1 size-2 shrink-0 rounded-full bg-primary" />}
                  </div>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-center text-sm font-medium text-primary">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
