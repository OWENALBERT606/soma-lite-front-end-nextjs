"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { toast } from "sonner"
import { createRole, CreateRoleData } from "@/actions/roles"
import RoleForm from "../components/roles-form"

export default function CreateRolePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: CreateRoleData) => {
    try {
      setIsSubmitting(true)
      const result = await createRole(data)

      if (result.success && result.data) {
        toast.success("Role created successfully")
        router.push(`/dashboard/roles/${result.data.id}`)
      } else {
        toast.error(result.error || "Failed to create role")
      }
    } catch (error) {
      toast.error("Failed to create role")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex-1 space-y-8 p-8">
      {/* Header */}
      <div>
        <Link href="/dashboard/roles">
          <Button variant="ghost" className="gap-2 -ml-4 mb-4">
            <ChevronLeft className="w-4 h-4" />
            Back to Roles
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Create Role</h1>
        <p className="text-muted-foreground mt-2">Add a new role to your system</p>
      </div>

      {/* Form Card */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Role Details</CardTitle>
          <CardDescription>Define the role name, system identifier, and associated permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <RoleForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </CardContent>
      </Card>
    </div>
  )
}
