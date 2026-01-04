"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/#features", label: "Features" },
  {
    label: "Solutions",
    children: [
      { href: "/solutions/finance", label: "Finance & SchoolPay", description: "Fee collection and reconciliation" },
      { href: "/solutions/academics", label: "Academics", description: "Exams and automated report cards" },
      { href: "/solutions/administration", label: "Administration", description: "Inventory and staff management" },
    ],
  },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
]

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)
  const pathname = usePathname()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm border-b py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
            <Image src="/logo.png" alt="Soma-Lite Logo" width={180} height={45} className="h-10 w-auto" priority />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                {link.children ? (
                  <>
                    <button
                      className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-colors hover:bg-primary/5 hover:text-primary"
                      onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                    >
                      {link.label}
                      <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                    </button>
                    {/* Dropdown */}
                    <div className="absolute top-full left-0 mt-2 w-64 bg-background border rounded-2xl shadow-xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 p-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex flex-col gap-1 px-4 py-3 rounded-xl hover:bg-primary/5 transition-colors"
                        >
                          <span className="font-semibold text-sm">{child.label}</span>
                          <span className="text-xs text-muted-foreground">{child.description}</span>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-full transition-colors hover:bg-primary/5 hover:text-primary",
                      pathname === link.href && "text-primary bg-primary/5",
                    )}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:block">
              <Button variant="ghost" size="sm" className="rounded-full">
                Log in
              </Button>
            </Link>
            <Button size="sm" className="rounded-full px-5">
              Get Started
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b animate-in slide-in-from-top duration-300">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <div key={link.label} className="flex flex-col gap-2">
                <div className="font-semibold text-sm px-2 text-muted-foreground uppercase tracking-wider">
                  {link.label}
                </div>
                {link.children ? (
                  <div className="grid gap-2 pl-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="py-2 text-base font-medium hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="px-2 py-2 text-base font-medium hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <hr className="my-2" />
            <div className="grid gap-4">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full rounded-full bg-transparent">
                  Log in
                </Button>
              </Link>
              <Button className="w-full rounded-full">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
