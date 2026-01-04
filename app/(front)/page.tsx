import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  BookOpen,
  FileSpreadsheet,
  CreditCard,
  Package,
  Calendar,
  UserCheck,
  HeartPulse,
  GraduationCap,
  ShieldCheck,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-1 pb-20 md:pt-2 md:pb-2 lg:pt-4">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="flex flex-col gap-6">
                <div className="inline-flex w-fit items-center rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
                  <span className="mr-2 rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">New</span>
                  Enhanced for Uganda's New Curriculum
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Modern School Management for <span className="text-primary italic">Uganda</span>
                </h1>
                <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl/relaxed">
                  The complete digital toolkit for Ugandan schools. Manage admissions, automated report cards, SchoolPay
                  integrations, and more in one powerful platform.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" className="h-12 rounded-full px-8 text-base">
                    Request a Demo
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 rounded-full px-8 text-base bg-transparent">
                    View Pricing
                  </Button>
                </div>
              </div>
              <div className="relative aspect-square lg:aspect-auto lg:h-[600px]">
                <div className="absolute inset-0 rounded-3xl bg-primary/10 shadow-2xl overflow-hidden border border-primary/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/5" />
                  <img
                    src="/fantasticshoolhome.png"
                    alt="Soma-Lite Dashboard"
                    className="h-full w-full object-cover p-4 md:p-8"
                  />
                </div>
                {/* Floating stats card inspired by design */}
                <Card className="absolute -bottom-6 -left-6 hidden w-64 shadow-xl md:block border-primary/20">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm font-medium">Fee Collection Rate</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-3xl font-bold text-primary">+92%</div>
                    <p className="text-xs text-muted-foreground">Improvement with SchoolPay integration</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="bg-secondary/50 py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              Everything your school needs
            </h2>
            <p className="mx-auto max-w-[800px] text-muted-foreground text-lg mb-16">
              Tailored specifically for Ugandan requirements, from NCDC curriculum standards to local payment
              integrations.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, i) => (
                <Card
                  key={i}
                  className="group border-none shadow-sm transition-all hover:shadow-md hover:-translate-y-1 bg-background"
                >
                  <CardHeader className="flex flex-col items-center text-center pb-2">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <feature.icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-muted-foreground">
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-24 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center gap-12 md:flex-row">
              <div className="md:w-1/2">
                <img
                  src="/images (10).jpg"
                  alt="Payment Integration"
                  className="rounded-2xl shadow-2xl border border-border"
                />
              </div>
              <div className="md:w-1/2 flex flex-col gap-6">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Automated Finance & <span className="text-primary">SchoolPay</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Reduce reconciliation errors by 100%. Soma-Lite integrates directly with SchoolPay and local telecom
                  networks for seamless mobile money fee payments.
                </p>
                <ul className="space-y-4">
                  {[
                    "Instant SMS receipting for parents",
                    "Automatic student account updates",
                    "Real-time bank reconciliation",
                    "Comprehensive bursar reports",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-24 text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-8">
              Empower your school with Soma-Lite
            </h2>
            <p className="mx-auto max-w-[600px] text-primary-foreground/80 text-lg mb-12">
              Join dozens of forward-thinking schools in Uganda transforming their administration.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" className="h-12 rounded-full px-8 text-base">
                Book Free Setup
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-full px-8 text-base border-primary-foreground/20 hover:bg-white/10 bg-transparent"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold tracking-tight text-primary">Soma-Lite</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Empowering Ugandan education through smart, localized management software.
              </p>
            </div>
            {/* Footer columns */}
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    SchoolPay
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Mobile App
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    NCDC Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    API Docs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Kampala, Uganda</li>
                <li>support@soma-lite.ug</li>
                <li>+256 700 000 000</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Soma-Lite. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Student Database",
    description: "Secure, centralized records for every student with comprehensive history.",
    icon: Users,
  },
  {
    title: "Exam Management",
    description: "Automated marksheets and report cards based on the new NCDC syllabus.",
    icon: FileSpreadsheet,
  },
  {
    title: "Finance & Fees",
    description: "Seamless billing and fee tracking with integrated mobile money payments.",
    icon: CreditCard,
  },
  {
    title: "Inventory & Stores",
    description: "Track textbooks, uniforms, and school assets in real-time.",
    icon: Package,
  },
  {
    title: "Digital Library",
    description: "Manage book loans, returns, and track reading habits across the school.",
    icon: BookOpen,
  },
  {
    title: "Health Tracker",
    description: "Monitor student medical records and daily health status.",
    icon: HeartPulse,
  },
  {
    title: "Staff & Attendance",
    description: "Biometric or manual attendance for students and employees.",
    icon: UserCheck,
  },
  {
    title: "Calendar & Events",
    description: "Synchronized school term dates, events, and important deadlines.",
    icon: Calendar,
  },
]
