"use client"
import {
  Activity,
  BarChart3,
  Building2,
  ChevronRight,
  Globe,
  LineChart,
  Search,
  ShieldCheck,
  Users,
  Bell,
  Plus,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Line, LineChart as RechartsLineChart, ResponsiveContainer, XAxis, YAxis, AreaChart, Area } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data reflecting the Ugandan Multi-School System
const enrollmentData = [
  { month: "Jan", students: 12000, revenue: 450 },
  { month: "Feb", students: 12500, revenue: 480 },
  { month: "Mar", students: 12800, revenue: 510 },
  { month: "Apr", students: 13200, revenue: 540 },
  { month: "May", students: 14000, revenue: 600 },
  { month: "Jun", students: 14500, revenue: 630 },
]

const schools = [
  { id: "1", name: "Greenhill Academy", district: "Kampala", students: 2450, status: "Active", health: 98 },
  { id: "2", name: "Gayaza High School", district: "Wakiso", students: 1800, status: "Active", health: 95 },
  { id: "3", name: "Namilyango College", district: "Mukono", students: 1200, status: "Active", health: 92 },
  { id: "4", name: "St. Mary's Kitende", district: "Wakiso", students: 3100, status: "Maintenance", health: 88 },
]

export function SuperAdminDashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation - Inspired by Vercel Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-14 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                <ShieldCheck className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-sm tracking-tight hidden md:inline-block">UGANDA MULTI-SCHOOL</span>
            </div>
            <div className="h-4 w-[1px] bg-border mx-2" />
            <nav className="flex items-center space-x-4 text-sm font-medium">
              <span className="text-foreground">System Overview</span>
              <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                Schools
              </span>
              <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                Infrastructure
              </span>
              <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                Billing
              </span>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1.5 hidden md:flex bg-transparent">
              <Plus className="h-3.5 w-3.5" />
              Register School
            </Button>
            <div className="h-8 w-8 rounded-full bg-secondary border border-border flex items-center justify-center overflow-hidden">
              <img src="/admin-avatar.png" alt="Avatar" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 container py-8 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-widest font-semibold">
                <Globe className="h-3 w-3" />
                Global Infrastructure
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="h-8 px-3 rounded-md bg-secondary/50 border-border">
                All Regions: Uganda
              </Badge>
              <Button size="sm" className="h-8">
                System Health: 100%
              </Button>
            </div>
          </div>

          {/* Metrics Grid - Inspired by BENTO layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-card border-border shadow-none overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Building2 className="h-12 w-12" />
              </div>
              <CardHeader className="pb-2">
                <CardDescription className="text-xs uppercase font-bold">Total Schools</CardDescription>
                <CardTitle className="text-2xl">142</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-primary font-medium flex items-center gap-1">
                  <Activity className="h-3 w-3" /> +12 this month
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-none overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Users className="h-12 w-12" />
              </div>
              <CardHeader className="pb-2">
                <CardDescription className="text-xs uppercase font-bold">Total Students</CardDescription>
                <CardTitle className="text-2xl">45,892</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-primary font-medium flex items-center gap-1">
                  <Activity className="h-3 w-3" /> +2.4k new admissions
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-none overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <LineChart className="h-12 w-12" />
              </div>
              <CardHeader className="pb-2">
                <CardDescription className="text-xs uppercase font-bold">System Revenue</CardDescription>
                <CardTitle className="text-2xl">UGX 84.2M</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-accent font-medium flex items-center gap-1">
                  <Activity className="h-3 w-3" /> 15% increase vs LY
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-none overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldCheck className="h-12 w-12" />
              </div>
              <CardHeader className="pb-2">
                <CardDescription className="text-xs uppercase font-bold">Uptime (30d)</CardDescription>
                <CardTitle className="text-2xl">99.98%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-emerald-500 font-medium flex items-center gap-1">Operational</div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row - Inspired by Observability Page */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border-border shadow-none">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-semibold">Student Enrollment Growth</CardTitle>
                  <CardDescription className="text-xs">Aggregate data across all districts</CardDescription>
                </div>
                <Badge variant="secondary" className="text-[10px] uppercase font-bold">
                  Live
                </Badge>
              </CardHeader>
              <CardContent className="h-[250px] pt-4">
                <ChartContainer
                  config={{
                    students: { label: "Students", color: "oklch(var(--chart-1))" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={enrollmentData}>
                      <defs>
                        <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="oklch(var(--chart-1))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="oklch(var(--chart-1))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" hide />
                      <YAxis hide />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="students"
                        stroke="oklch(var(--chart-1))"
                        fillOpacity={1}
                        fill="url(#colorStudents)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-none">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-semibold">Revenue Collection (M UGX)</CardTitle>
                  <CardDescription className="text-xs">Monthly platform fee distribution</CardDescription>
                </div>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="h-[250px] pt-4">
                <ChartContainer
                  config={{
                    revenue: { label: "Revenue", color: "oklch(var(--chart-2))" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={enrollmentData}>
                      <XAxis dataKey="month" hide />
                      <YAxis hide />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="stepAfter"
                        dataKey="revenue"
                        stroke="oklch(var(--chart-2))"
                        strokeWidth={2}
                        dot={false}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* School Directory Table - Inspired by "Request Path" section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search schools by name or code..."
                  className="pl-9 h-9 bg-secondary/50 border-border"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-9 bg-transparent">
                  Filters
                </Button>
                <Button variant="outline" size="sm" className="h-9 bg-transparent">
                  Export CSV
                </Button>
              </div>
            </div>

            <Card className="bg-card border-border shadow-none">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground text-[11px] uppercase tracking-wider font-semibold bg-secondary/30">
                      <th className="text-left py-3 px-4">School Name</th>
                      <th className="text-left py-3 px-4">District</th>
                      <th className="text-left py-3 px-4">Students</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">System Health</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {schools.map((school) => (
                      <tr key={school.id} className="hover:bg-secondary/20 transition-colors group">
                        <td className="py-3 px-4 font-medium flex items-center gap-3">
                          <div className="h-8 w-8 rounded bg-secondary flex items-center justify-center font-bold text-[10px] text-muted-foreground">
                            {school.name.substring(0, 2)}
                          </div>
                          {school.name}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{school.district}</td>
                        <td className="py-3 px-4">{school.students.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={school.status === "Active" ? "default" : "secondary"}
                            className="text-[10px] py-0 h-5"
                          >
                            {school.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 w-24 rounded-full bg-secondary overflow-hidden">
                              <div
                                className={`h-full rounded-full ${school.health > 90 ? "bg-emerald-500" : "bg-accent"}`}
                                style={{ width: `${school.health}%` }}
                              />
                            </div>
                            <span className="text-[10px] font-mono">{school.health}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-border p-4 flex items-center justify-between bg-secondary/10">
                <p className="text-[11px] text-muted-foreground">Showing 1-4 of 142 schools</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="h-7 w-7 bg-transparent" disabled>
                    <ChevronRight className="h-3.5 w-3.5 rotate-180" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-7 w-7 bg-transparent">
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
