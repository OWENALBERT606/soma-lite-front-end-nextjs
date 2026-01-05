


"use client"

import * as React from "react"
import {
  LayoutDashboard,
  School,
  Users,
  BarChart3,
  DollarSign,
  Settings,
  Shield,
  Bell,
  FileText,
  Activity,
  ChevronDown,
  UserCog,
  GraduationCap,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */
type SidebarUser = {
  name?: string | null
  email?: string | null
  image?: string | null
  role?: string | null
}

/* ------------------------------------------------------------------ */
/* Navigation */
/* ------------------------------------------------------------------ */
const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Main",
    url: "/schools",
    icon: School,
    badge: "24",
    items: [
      { title: "Roles", url: "/dashboard/roles" },
      { title: "Schools", url: "/dashboard/schools" },
      { title: "School Categories", url: "/schools/categories" },
    ],
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
    items: [
      { title: "Users", url: "/dashboard/users" },
      { title: "Students", url: "/users/students" },
      { title: "Teachers", url: "/users/teachers" },
      { title: "Administrators", url: "/users/admins" },
      { title: "Parents", url: "/users/parents" },
    ],
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
    items: [
      { title: "Overview", url: "/analytics" },
      { title: "Enrollment Trends", url: "/analytics/enrollment" },
      { title: "Academic Performance", url: "/analytics/performance" },
      { title: "Financial Insights", url: "/analytics/financial" },
    ],
  },
  {
    title: "Financial",
    url: "/financial",
    icon: DollarSign,
    items: [
      { title: "Revenue Overview", url: "/financial" },
      { title: "Fee Collection", url: "/financial/fees" },
      { title: "Transactions", url: "/financial/transactions" },
      { title: "Reports", url: "/financial/reports" },
    ],
  },
  {
    title: "System Health",
    url: "/system",
    icon: Activity,
    items: [
      { title: "Server Status", url: "/system/status" },
      { title: "Database", url: "/system/database" },
      { title: "API Logs", url: "/system/logs" },
      { title: "Integrations", url: "/system/integrations" },
    ],
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    items: [
      { title: "General", url: "/settings" },
      { title: "Security", url: "/settings/security" },
      { title: "Email & Notifications", url: "/settings/notifications" },
      { title: "Integrations", url: "/settings/integrations" },
      { title: "Backup & Restore", url: "/settings/backup" },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */
export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user?: SidebarUser
}) {
  const pathname = usePathname()
  const { state } = useSidebar()
  const [openItems, setOpenItems] = React.useState<string[]>(["Main", "Users"])

  const toggleItem = (title: string) => {
    setOpenItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    )
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* ---------------- Header ---------------- */}
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <GraduationCap className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Uganda Schools
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user?.role ?? "Super Admin"}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ---------------- Content ---------------- */}
      <SidebarContent>
        <SidebarMenu className="gap-2 p-2">
          {navigationItems.map((item) => {
            const isActive =
              pathname === item.url ||
              pathname.startsWith(item.url + "/")

            const hasSubmenu = !!item.items?.length
            const isOpen = openItems.includes(item.title)

            return (
              <SidebarMenuItem key={item.title}>
                {hasSubmenu ? (
                  <>
                    <SidebarMenuButton
                      onClick={() => toggleItem(item.title)}
                      isActive={isActive}
                      tooltip={state === "collapsed" ? item.title : undefined}
                      className="h-10"
                    >
                      <item.icon className="size-4" />
                      <span>{item.title}</span>

                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="ml-auto h-5 px-1.5 text-xs"
                        >
                          {item.badge}
                        </Badge>
                      )}

                      <ChevronDown
                        className={`ml-auto size-4 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </SidebarMenuButton>

                    {isOpen && (
                      <SidebarMenuSub>
                        {item.items!.map((sub) => (
                          <SidebarMenuSubItem key={sub.url}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === sub.url}
                              className="h-6"
                            >
                              <Link href={sub.url}>{sub.title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </>
                ) : (
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={state === "collapsed" ? item.title : undefined}
                    className="h-10"
                  >
                    <Link href={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* ---------------- Footer ---------------- */}
      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="size-8 rounded-lg">
                    <AvatarImage src={user?.image ?? undefined} />
                    <AvatarFallback>
                      {user?.name?.charAt(0) ?? "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.name ?? "System Admin"}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user?.email ?? "admin@schools.ug"}
                    </span>
                  </div>

                  <ChevronDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" side="top" sideOffset={4}>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <UserCog className="mr-2 size-4" />
                  Profile Settings
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Shield className="mr-2 size-4" />
                  Security
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Bell className="mr-2 size-4" />
                  Notifications
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-destructive">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
